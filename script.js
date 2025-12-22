
// Init Animation Library
AOS.init({
    once: true,
    offset: 100,
    duration: 800,
    easing: 'ease-out-cubic',
});

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check local storage or system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
} else {
    html.classList.remove('dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

themeBtn.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        localStorage.theme = 'light';
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Mobile Menu
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- PROJECT FILTERING LOGIC ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button styles
        filterButtons.forEach(b => {
            b.classList.remove('bg-tech-500', 'text-white');
            b.classList.add('text-gray-600', 'dark:text-gray-400');
        });
        btn.classList.add('bg-tech-500', 'text-white');
        btn.classList.remove('text-gray-600', 'dark:text-gray-400');

        // Filter logic
        const filter = btn.id.replace('filter-', '');

        projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
                // Re-trigger AOS animation
                item.classList.remove('aos-animate');
                setTimeout(() => item.classList.add('aos-animate'), 50);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});


// --- CONTACT FORM LOGIC ---
// 1. Tag Selection Logic
const tags = document.querySelectorAll('.form-tag');
const interestInput = document.getElementById('interest');

tags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Toggle active style
        tags.forEach(t => t.classList.remove('bg-tech-500', 'text-white', 'border-tech-500'));
        tag.classList.add('bg-tech-500', 'text-white', 'border-tech-500');
        tag.classList.remove('text-gray-600', 'dark:text-gray-400');

        // Set hidden input value
        interestInput.value = tag.getAttribute('data-value');
    });
});

// Helper function to get form data
function getFormData() {
    const name = document.getElementById('from_name').value;
    const email = document.getElementById('reply_to').value;
    const interest = document.getElementById('interest').value || 'General Inquiry';
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert("Please fill in all fields (Name, Email, Message)");
        return null;
    }

    return { name, email, interest, message };
}

// 2. Send via Web3Forms (AJAX)
// !!! IMPORTANT: Replace this with your actual Access Key !!!
// Go to https://web3forms.com/ to get one
const web3FormsAccessKey = "b03dd589-0ea8-4779-b9d8-66c5468593d2";

async function sendEmail() {
    const data = getFormData();
    if (!data) return;

    const btn = document.getElementById('email-btn');
    const btnText = document.getElementById('email-btn-text');

    // Set Loading State
    const originalText = btnText.innerText;
    btnText.innerText = "Sending...";
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: web3FormsAccessKey,
                name: data.name,
                email: data.email,
                subject: `Portfolio Inquiry - ${data.interest}`,
                message: data.message,
                interest: data.interest
            })
        });

        const result = await response.json();

        if (response.status === 200) {
            alert("Message sent successfully! I'll get back to you soon.");
            document.getElementById('contact-form').reset();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Oops! There was a problem sending your form.");
    } finally {
        // Reset Button State
        btnText.innerText = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
}

// 3. Send via WhatsApp
function sendWhatsApp() {
    const data = getFormData();
    if (!data) return;

    // !!! IMPORTANT: Replace this with your phone number !!!
    // Format: Country Code + Number (e.g., 2348012345678)
    const yourPhoneNumber = "2349138332291";

    const text = `*New Portfolio Inquiry*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Interest:* ${data.interest}\n\n*Message:* ${data.message}`;

    const url = `https://wa.me/${yourPhoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}




// Skills Data

// const codingToolsData = [
//     {
//         "name": "HTML",
//         "img_alt": "HTML",
//         "img_src": "assets/HTML.svg",
//     },

//     {
//         "name": "CSS",
//         "img_alt": "CSS",
//         "img_src": "assets/CSS.SVG",
//     },

//     {
//         "name": "JS",
//         "img_alt": "JS",
//         "img_src": "assets/JS.SVG",
//     },

//     {
//         "name": "TAILWINDCSS",
//         "img_alt": "TAILWINDCSS",
//         "img_src": "assets/TAILWINDCSS.SVG",
//     },

//     {
//         "name": "GITHUB",
//         "img_alt": "GITHUB",
//         "img_src": "assets/GITHUB.SVG",
//     },
// ]

// const skillsContainer = document.getElementById('skills-container');
// console.log(skillsContainer);

// // Map over the JSON array

// const codingData = codingToolsData.map((tool) => {
//     return `
//              <div class="flex flex-col items-center gap-2 group cursor-pointer">
//                             <div class="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700">
//                                 <img src="${tool.img_src}" class="w-8 h-8" alt="${tool.img_alt}">
//                             </div>
//                             <span class="text-xs font-mono text-gray-500 dark:text-gray-400">${tool.name}   </span>
//                         </div>
//                    `
// })

// skillsContainer.innerHTML = codingData.join('');





// const photographyToolsData = [
//     {
//         "name": "Lightroom",
//         "img_alt": "Lr",
//         "img_src": "assets/photoshop-lightroom-classic_5968510 (1).png",
//     },

//     {
//         "name": "Photoshop",
//         "img_alt": "Ps",
//         "img_src": "assets/adobe-photoshop_5210800.png",
//     },

//     {
//         "name": "CaptureOne",
//         "img_alt": "C1",
//         "img_src": "assets/512px-CAPTURE_ONE_LOGO.svg.png",
//     },

//     {
//         "name": "Nikon",
//         // "img_alt": "TAILWINDCSS",
//         "img_src": "assets/NIKON.svg",
//     },

//     // {
//     //     "namee": "GIT",
//     //     "img_alt": "GIT",
//     //     "img_src": "assets/GITHUB.SVG",
//     // },
// ]


// const photographycontainer = document.getElementById('photography-container');
// console.log(photographycontainer);


// const photographyData = photographyToolsData.map((tool) => {
//     return `
//      <div class="flex flex-col items-center gap-2 group cursor-pointer">
//                             <div class="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700">
//                                 <img src="${tool.img_src}" class="w-8 h-8 object-contain" alt="${tool.img_alt}">
//                             </div>
//                             <span class="text-xs font-mono text-gray-500 dark:text-gray-400">${tool.name}</span>
//                         </div>
//                         `
// })

// photographycontainer.innerHTML = photographyData.join('');