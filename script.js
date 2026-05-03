const passwordCorrect = "160507";
const passInput = document.getElementById('passwordInput');
const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('login-screen');
const messageScreen = document.getElementById('message-screen');
const countdownScreen = document.getElementById('countdown-screen');
const cakeScreen = document.getElementById('cake-screen'); // Đã thêm màn hình bánh kem
const finalScreen = document.getElementById('final-screen');


const bgMusic = document.getElementById('bgMusic');
const countdownMusic = document.getElementById('countdownMusic');
const errorMsg = document.getElementById('errorMessage');


const messages = [
    {
        title: "Happy Birthday, Bestie! 🌿",
        body: "Gửi nhỏ cốt của t, chúc m tuổi mới luôn xinh đẹp, học giỏi và mãi là 'đồng bọn' của t nha!"
    },
    {
        title: "Đôi lời gửi m...",
        body: "Cảm ơn m vì đã là một phần trong thời thanh xuân của t, dù có thể tụi mình k quá thân nhưng với t m vẫn là 1 đứa bạn đáng quý "
    },
    {
        title: "Tuổi mới...",
        body: "Chúc m có tất cả trừ vất vả, tiền tài đầy túi, sớm có anh bồ như ý m😉 "
    },
    {
        title: "Sẵn sàng chưa?",
        body: "Đọc xong rồi thì nhấn Next phát nữa để coi tiếp nè..."
    }
];

let currentMessageIndex = 0;
const msgTitle = document.getElementById('messageTitle');
const msgBody = document.getElementById('messageBody');
const nextBtn = document.getElementById('nextBtn');


loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    if (passInput.value.trim() === passwordCorrect) {
        
        errorMsg.style.color = '#b2d8b2'; 
        errorMsg.style.textShadow = '0 0 10px #b2d8b2';
        errorMsg.innerText = 'ACCESS GRANTED. UNLOCKING...';
        errorMsg.style.display = 'block';
        
    
        setTimeout(() => {
            loginScreen.style.animation = "fadeOutZoom 0.8s forwards";
            
            setTimeout(() => {
                loginScreen.classList.remove('active');
                messageScreen.classList.add('active');
                
                
                messageScreen.style.animation = "fadeInZoom 1s forwards";
                
                bgMusic?.play().catch(err => console.log("Cần click để phát nhạc"));
                startMatrix();
            }, 800);
        }, 1000); 

    } else {
        errorMsg.style.color = 'var(--error-red)'; 
        errorMsg.style.textShadow = 'none';
        errorMsg.innerText = 'ACCESS DENIED!';
        errorMsg.style.display = 'block';
        passInput.value = "";
        setTimeout(() => { errorMsg.style.display = 'none'; }, 2000);
    }
});


nextBtn.addEventListener('click', () => {
    
    
    confetti({
        particleCount: 50,  
        spread: 60,         
        origin: { y: 0.65 }, 
        colors: ['#b2d8b2', '#ffffff', '#ff99cc', '#e0f2f1'] 
    });

    if (currentMessageIndex < messages.length - 1) {
       
        msgTitle.classList.add('hide');
        msgBody.classList.add('hide');
        
        setTimeout(() => {
            currentMessageIndex++;
            msgTitle.innerText = messages[currentMessageIndex].title;
            msgBody.innerText = messages[currentMessageIndex].body;
            
            msgTitle.classList.remove('hide');
            msgBody.classList.remove('hide');
        }, 600); 
    } else {
        
        bgMusic?.pause(); 
        countdownMusic?.play().catch(err => console.log("Lỗi phát nhạc đếm ngược")); 
        
        messageScreen.classList.remove('active');
        countdownScreen.classList.add('active');
        
        let count = 3;
        const countDisplay = document.getElementById('countdown-number');
        countDisplay.innerText = count;

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countDisplay.innerText = count;
            } else {
                clearInterval(timer);
                countdownScreen.classList.remove('active');
                
                
                cakeScreen.classList.add('active');
                
                
                setTimeout(() => {
                    cakeScreen.style.animation = "fadeOutZoom 0.8s forwards";
                    
                    setTimeout(() => {
                        cakeScreen.classList.remove('active');
                        finalScreen.classList.add('active');
                        
                        
                        setTimeout(() => {
                            document.querySelector('.final-image').classList.add('show');
                        }, 300);

                        
                        const words = document.querySelectorAll('.pop-word');
                        words.forEach((word, index) => {
                            setTimeout(() => {
                                word.classList.add('show');
                                
                                
                                if (index === words.length - 1) {
                                    confetti({
                                        particleCount: 300,
                                        spread: 120,
                                        origin: { y: 0.5 },
                                        colors: ['#b2d8b2', '#ffffff', '#ff99cc', '#ffd700'] 
                                    });
                                }
                            }, 1000 + (index * 300)); 
                        });

                    }, 800); 
                }, 3000); 
            }
        }, 1000); 
    }
});


const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "HAPPYBIRTHDAY";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#b2d8b2";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}

function startMatrix() {
    setInterval(drawMatrix, 50); 
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});