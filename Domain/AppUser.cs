using System;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser:IdentityUser
    {
        public string DispalyName{get;set;}
        public string Bio{get;set;}

    }
}
