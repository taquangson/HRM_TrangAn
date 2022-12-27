using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChatBotModel
    {
        public int ID { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }

    }
}