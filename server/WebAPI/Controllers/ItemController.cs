using Application.DTOs;
using Application.DTOs.ItemDtos;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using System.Net;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/v1/items")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly IUserService _userService;
        private readonly ICategoryService _categoryService;

        public ItemController(IItemService itemService, IUserService userService, ICategoryService categoryService)
        {
            _itemService = itemService;
            _userService = userService;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            var result = await _itemService.GetListAsync();
            if (!result.Succeeded)
            {
                BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet("{itemId:int}")]
        public async Task<IActionResult> GetItemById(int itemId)
        {
            var result = await _itemService.GetByIdAsync(itemId);
            if (!result.Succeeded && result.Status == HttpStatusCode.NotFound)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateItem(CreateItemDto item)
        {
            Console.WriteLine("CreateItem " + JsonSerializer.Serialize(item));
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userId = identity.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                item.UserId = int.Parse(userId);
                var result = await _itemService.AddAsync(item);
                if (!result.Succeeded)
                {
                    BadRequest(result);
                }

                return Created(nameof(CreateItem), result);
            }
            return Unauthorized(new Response<string>("Bearer token missing"));
        }

        [Authorize]
        [HttpDelete("{itemId:int}")]
        public async Task<IActionResult> DeleteItemById(int itemId)
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                var result = await _itemService.DeleteAsync(itemId, userId);
                if (result.Status == HttpStatusCode.NotFound)
                {
                    return NotFound(result);
                } else if (result.Status == HttpStatusCode.Forbidden)
                {
                    return StatusCode(403, result);
                }else if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                return Ok(result);
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateItem(UpdateItemDto item)
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                item.UserId = userId;

                var itemRes = await _itemService.GetByIdAsync(item.Id);
                if (!itemRes.Data.User.Id.Equals(userId))
                {
                    return StatusCode(403, itemRes);
                }

                var result = await _itemService.UpdateAsync(item);
                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                return Ok(result);
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> ChangeItemStatus(ChangeItemStatusDto changeItemStatusDto)
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                var itemRes = await _itemService.GetByIdAsync(changeItemStatusDto.Id);

                if (itemRes.Data.Id.Equals(userId))
                {
                    return StatusCode(403, itemRes);
                }

                var result = await _itemService.ChangeItemStatusAsync(changeItemStatusDto);
                if (!result.Succeeded)
                {
                    return NotFound(result);
                }

                return Ok(result);
            }

            return Unauthorized();
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetItemCategories()
        {
            var categoryRes = await _categoryService.GetListAsync();
            if (!categoryRes.Succeeded)
                return BadRequest("Get list category failed!");
            else
                return Ok(categoryRes);
        }

    }
}
