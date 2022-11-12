using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibData.Entities.Identity
{
    public class UserEntity : IdentityUser<int>
    {
        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
    }
}
