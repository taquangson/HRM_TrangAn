using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class SortByMarketcapModel
    {
        public SortByMarketcapModel() { }
        public string Ticket { get; set; }
        public long Market_cap { get; set; }
        public long Total_assets { get; set; }
        public long Total_liabilities { get; set; }
        public float Debt_to_assets { get; set; }
        public string Rank { get; set; }
    }
}