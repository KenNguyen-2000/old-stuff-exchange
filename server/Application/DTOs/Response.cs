using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class Response<T>
    {
        public bool Succeeded { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }
        public T Data { get; set; }
        public IEnumerable<T> Datas { get; set; }
        public int Count { get; set; } = 0;
        public HttpStatusCode Status { get; set; }

        public Response() { }
        public Response(string message, bool success = false, HttpStatusCode status = HttpStatusCode.InternalServerError)
        {
            Succeeded = success;
            Message = message;
            Status = status;
        }
        public Response(IEnumerable<T> datas, string message, int count = 0, HttpStatusCode status = HttpStatusCode.OK)
        {
            Succeeded = true;
            Message = message;
            Datas = datas;
            Count = count != 0 ? count : Datas.Count();
            Status = status;
        }
        public Response(T data, string message = null, HttpStatusCode status = HttpStatusCode.OK)
        {
            Succeeded = true;
            Message = message;
            Data = data;
            Status = status;
        }
    }
}
