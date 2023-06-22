using Application.DTOs;
using Application.DTOs.ItemDtos;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/v1/items")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly IUserService _userService;

        public ItemController(IItemService itemService, IUserService userService)
        {
            _itemService = itemService;
            _userService = userService;
        }

        [Authorize]
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

        [HttpGet("{itemId:Guid}")]
        public async Task<IActionResult> GetItemById(Guid itemId)
        {
            var result = await _itemService.GetByIdAsync(itemId);
            if (!result.Succeeded)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateItem(CreateItemDto item)
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userId = identity.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                item.UserId = Guid.Parse(userId);
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
        [HttpDelete("{itemId:Guid}")]
        public async Task<IActionResult> DeleteItemById(Guid itemId)
        {
            var itemRes = await _itemService.GetByIdAsync(itemId);
            if (itemRes.Data == null)
            {
                return NotFound(itemRes);
            }
            ClaimsIdentity? identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userId = Guid.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                if (itemRes.Data.User.Id.Equals(userId))
                {
                    return Forbid(nameof(DeleteItemById), userId.ToString());
                }

                var result = await _itemService.DeleteAsync(itemId);
                if (!result.Succeeded)
                {
                    return NotFound(result);
                }

                return Ok(result);
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateItem(UpdateItemDto item)
        {
            ClaimsIdentity? identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userId = Guid.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                item.UserId = userId;

                var itemRes = await _itemService.GetByIdAsync(item.Id);
                if (itemRes.Data.User.Id.Equals(userId))
                {
                    return Forbid(nameof(UpdateItem), userId.ToString());
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
            ClaimsIdentity? identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userId = Guid.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                var itemRes = await _itemService.GetByIdAsync(changeItemStatusDto.Id);

                if (itemRes.Data.Id.Equals(userId))
                {
                    return Forbid(nameof(ChangeItemStatus), userId.ToString());
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

        [Authorize]
        [HttpPost("purchase/{itemId:Guid}")]
        public async Task<IActionResult> PurchaseItem(Guid itemId)
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                Guid userId = Guid.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                var result = await _itemService.PurchaseItemAsync(itemId, userId);
                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                return Ok(result);
            }

            return Unauthorized();
        }
    }
}
