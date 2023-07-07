using Application;
using Application.DTOs;
using Application.DTOs.OrderDtos;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var result = await _orderService.GetListAsync();
            if (!result.Succeeded)
            {
                BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpGet("{orderId:int}")]
        public async Task<IActionResult> GetOrderById(int orderId)
        {
            var result = await _orderService.GetByIdAsync(orderId);
            if (!result.Succeeded && result.Status == HttpStatusCode.NotFound)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateAnOrder(CreateOrderDtos createOrderDtos)
        {
            if(HttpContext.User.Identity is ClaimsIdentity identity)
            {
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                createOrderDtos.UserId = userId;

                var orderRes = await _orderService.AddAsync(createOrderDtos);

                return Ok(orderRes);
            }
            else
            {
                return Unauthorized("Token invalid");
            }
        }

        [Authorize]
        [HttpPatch("status/{orderId:int}")]
        public async Task<IActionResult> ChangeOrderStatus(int orderId, [FromBody] string status)
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

            switch (orderRes.Status)
            {
                case HttpStatusCode.NotFound:
                    return NotFound(orderRes);
                case HttpStatusCode.Forbidden:
                    return StatusCode(403, orderRes);
                default:
                    return BadRequest(orderRes);
            }
        }
    }
}