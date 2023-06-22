using Application.DTOs;
using Application.DTOs.OrderDtos;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("/api/v1/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAnOrder(CreateOrderDtos createOrderDtos)
        {
            var orderRes = await _orderService.AddAsync(createOrderDtos);

            if (!orderRes.Succeeded)
                return BadRequest(orderRes);

            return Ok(orderRes);
        }

        [HttpPatch("status/{orderId:Guid}")]
        public async Task<IActionResult> ChangeOrderStatus(Guid orderId, [FromBody] string status)
        {
            if (!Enum.TryParse(status, true, out OrderStatus statusResult))
            {
                return BadRequest(new Response<string>("Status not defined"));
            }



            ChangeOrderStatusDto changeOrderStatusDto = new()
            {
                Id = orderId,
                Status = statusResult
            };
            var orderRes = await _orderService.UpdateStatusAsync(changeOrderStatusDto);

            if (orderRes.Succeeded)
                return Ok(orderRes);

            return NotFound();
        }
    }
}