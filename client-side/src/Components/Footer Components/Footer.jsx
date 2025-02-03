import React from 'react'
 import "../CSS Components/footer.css"

export default function Footer() {
  return (
    <div>
        <footer>
            
<div class="footer-container">
    <div className="Heading" style={{display:"flex",justifyContent:"center",margin:"2rem"}}>
        <h3>Contact Link</h3>
    </div>
    <div className="Social-media">
    <a href="https://instagram.com/jitendra_verma_01?igshid=YmMyMTA2M2Y=">
    <ion-icon name="logo-instagram"></ion-icon></a>

    <ion-icon name="logo-whatsapp"></ion-icon>

    <a href="https://www.facebook.com/profile.php?id=100021696584177">
    <ion-icon name="logo-facebook"></ion-icon></a>
    
    <ion-icon name="mail-outline"></ion-icon>
    </div>

    <div className="Company-Intro">
        <div className="Contact">
        <p>Contact Us</p>
     <p>+91-1234567890</p>
        </div>
        
        <div className="Mail">
            <p>Email</p>
            <p>supportUs@gmail.com</p>
        </div>
        <div className="Address">
            <p>Address</p>
            <p>Vaishali Nagar , Jaipur</p>
        </div>
    </div>
</div>
        </footer>
    </div>
  )
}
