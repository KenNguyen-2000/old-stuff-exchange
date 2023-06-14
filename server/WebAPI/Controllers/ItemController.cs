using Application.DTOs.ItemDtos;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/v1/items")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [Authorize(Roles = "Admin")]
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
            if(!result.Succeeded)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost()]
        public async Task<IActionResult> CreateItem(CreateItemDto item)
        {
            ClaimsIdentity? identity = HttpContext.User.Identity as ClaimsIdentity;
            if(identity != null)
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
            return Unauthorized("Bearer token missing");
        }

        [Authorize]
        [HttpDelete("{itemId:Guid}")]
        public async Task<IActionResult> DeleteItemById(Guid itemId)
        {
            var result = await _itemService.DeleteAsync(itemId);
            if (!result.Succeeded)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateItem(UpdateItemDto item)
        {
            ClaimsIdentity? identity = HttpContext.User.Identity as ClaimsIdentity;
            if(identity != null)
            {
                var userId = identity.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                item.UserId = Guid.Parse(userId);
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
        public async Task<IActionResult> ChangeItemStatus([FromBody] ChangeItemStatusDto changeItemStatusDto)
        {
            var result = await _itemService.ChangeItemStatusAsync(changeItemStatusDto);
            if (!result.Succeeded)
            {
                return NotFound(result);
            }

            return Ok(result);
        }
    }
}
