using Demo_React.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo_React.Controllers
{
    public class HomeController : Controller
    {
        DemoEntities context = new DemoEntities();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        // GET: Home/DisplayUser
        public ActionResult DisplayUser()
        {
            return View();
        }
        // GET: Home/DisplayUser
        public JsonResult GetAllUserData()
        {
            var users = context.UserMasters.OrderBy(a => a.UserId).ToList();
            return new JsonResult { Data = users, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpGet]
        public JsonResult GetUserById(int userid)
        {
            var user = context.UserMasters.Find(userid);
            return new JsonResult { Data = user, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddUser(UserMaster obj)
        {
            try
            {
                if (obj.UserId <= 0)
                {
                    obj.Created = DateTime.Now;
                    context.UserMasters.Add(obj);
                    context.SaveChanges();
                    return Json(obj);
                }
                else
                {
                    UserMaster objuser = context.UserMasters.Find(obj.UserId);
                    objuser.FirstName = obj.FirstName;
                    objuser.LastName = obj.LastName;
                    objuser.UserName = obj.UserName;
                    objuser.Email = obj.Email;
                    objuser.Modified = DateTime.Now;
                    context.Entry(objuser).State = EntityState.Modified;
                    context.SaveChanges();
                    return Json(objuser);
                }
            }
            catch (Exception e)
            {
                throw;
            }

        }
    }
}