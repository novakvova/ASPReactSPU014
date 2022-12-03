namespace WebShopAPI.Models
{
    public class LoginViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <example>admin@gmail.com</example>
        public string Email { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <example>123456</example>
        public string Password { get; set; }
    }

    public class RegisterViewModel
    {
        /// <summary>
        /// 
        /// </summary>
        /// <example>user@gmail.com</example>
        public string Email { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <example>Іван</example>
        public string FistName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <example>Мельник</example>
        public string LastName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <example>+38(097)232-12-34</example>
        public string Phone { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public IFormFile Image { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <example>123456</example>
        public string Password { get; set; }
    }

    public class ChangeNewPasswordViewModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}
