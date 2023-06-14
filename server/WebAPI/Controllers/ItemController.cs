using Application.DTOs.ItemDtos;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost()]
        public async Task<IActionResult> CreateItem(CreateItemDto item)
        {
            var result = await _itemService.Add(item);
            if (!result.Succeeded)
            {
                BadRequest(result);
            }

            return Created(nameof(CreateItem), result);
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
        public async Task<IActionResult> UpdateItem([FromBody] Item item)
        {
            var result = await _itemService.UpdateAsync(item);
            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return Ok(result);
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
