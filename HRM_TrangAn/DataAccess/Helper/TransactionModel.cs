using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Helper
{
    public class TransactionModel
    {
        public string procName { get; set; }
        public SqlParameter[] procParams { get; set; }
    }
}