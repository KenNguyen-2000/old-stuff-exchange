using Application;
using Application.DTOs;
using Application.DTOs.MessageDtos;
using Application.DTOs.OrderDtos;
using Application.Hubs;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Net;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [Route("/api/v1/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IMessageService _messageService;

        public OrderController(IOrderService orderService, IHubContext<ChatHub> hubContext, IMessageService messageService)
        {
            _orderService = orderService;
            _hubContext = hubContext;
            _messageService = messageService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                var userRole = User.FindFirstValue(ClaimTypes.Role)!;

                var result = userRole.Equals(UserRole.Admin) ? await _orderService.GetListAsync() : await _orderService.GetUserOrderListAsync(userId);
                if (!result.Succeeded)
                {
                    BadRequest(result);
                }

                return Ok(result);
            }
            else
            {
                return Unauthorized("Token invalid");
            }
        }

        // [Authorize]
        // [HttpGet]
        // public async Task<IActionResult> GetAllUserOrders()
        // {
        //     if (HttpContext.User.Identity is ClaimsIdentity identity)
        //     {
        //         int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        //         var result = await _orderService.GetUserOrderListAsync(userId);

        //         return Ok(result);
        //     }
        //     else
        //     {
        //         return Unauthorized("Token invalid");
        //     }
        // }

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
            try
            {
                if (HttpContext.User.Identity is ClaimsIdentity identity)
                {
                    int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                    createOrderDtos.UserId = userId;

                    var orderRes = await _orderService.AddAsync(createOrderDtos);
                    if (orderRes.Succeeded)
                    {
                        CreateMessageDto newMessage = new()
                        {
                            RecieverId = orderRes.Data.Item.User.Id,
                            SenderId = userId,
                            Content = $"User with Id {userId} have purchase item: {orderRes.Data.Item.Name}!"
                        };

                        await _hubContext.Clients.User(userId.ToString()).SendAsync("RecieveMessage", newMessage.SenderId, newMessage.RecieverId, newMessage.Content);
                        await _messageService.AddAsync(newMessage);
                        return Ok(orderRes);
                    }
                    return BadRequest(orderRes);
                }
                else
                {
                    return Unauthorized("Token invalid");
                }
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpPatch("{orderId:int}")]
        public async Task<IActionResult> ChangeOrderStatus(int orderId, [FromBody] ChangeOrderStatusRequest changeOrderStatusRequest)
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                if (!Enum.TryParse(changeOrderStatusRequest.Status, true, out OrderStatus statusResult))
                {
                    return BadRequest(new Response<string>("Status not defined"));
                }


                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                ChangeOrderStatusDto newOrderStatus = new()
                {
                    Id = orderId,
                    Status = statusResult,
                    UserId = userId
                };
                var orderRes = await _orderService.UpdateStatusAsync(newOrderStatus);

                if (orderRes.Succeeded)
                {
                    CreateMessageDto newMessage = new()
                    {
                        RecieverId = orderRes.Data.Item.User.Id,
                        SenderId = userId,
                        Content = $"User with Id {userId} have update order status! Please check the information!"
                    };

                    await _hubContext.Clients.User(userId.ToString()).SendAsync("RecieveMessage", newMessage.SenderId, newMessage.RecieverId, newMessage.Content);
                    await _hubContext.Clients.Users(userId.ToString(), orderRes.Data.Item.User.Id.ToString()).SendAsync("OrderStatusUpdate", orderRes.Data.Status.ToString());
                    await _messageService.AddAsync(newMessage);
                    return Ok(orderRes);
                }

                // await _hubContext.Clients.User().SendAsync()

                return orderRes.Status switch
                {
                    HttpStatusCode.NotFound => NotFound(orderRes),
                    HttpStatusCode.Forbidden => StatusCode(403, orderRes),
                    _ => BadRequest(orderRes),
                };
            }
            else
            {
                return Unauthorized("Token invalid");
            }
        }
    }
}