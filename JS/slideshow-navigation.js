// PowerPoint-style Slideshow Navigation System
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Slideshow Navigation Loading...');

    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item a');
    console.log(`Found ${navItems.length} navigation items`);

    // Get the main container
    const mainSections = document.querySelector('.main-sections');
    if (!mainSections) {
        console.error('❌ .main-sections container not found!');
        return;
    }

    // Get all main elements (sections)
    const allSections = document.querySelectorAll('.main-sections > main');
    console.log(`Found ${allSections.length} main sections`);

    // Map navigation items to their corresponding sections
    const sectionMapping = {
        'HOME': allSections[0],        // First main element
        'ABOUT': allSections[1],       // main.about-content  
        'SERVICES': allSections[2],    // main#services-content
        'WORKS': allSections[3],       // main#works-content
        'BLOGS': allSections[4],       // Fifth main element
        'CONTACT': allSections[5]      // Sixth main element
    };

    // Debug: Log each section mapping
    Object.keys(sectionMapping).forEach(key => {
        const section = sectionMapping[key];
        if (section) {
            console.log(`✅ ${key}: Found (${section.className || 'no-class'} ${section.id || 'no-id'})`);
        } else {
            console.log(`❌ ${key}: Not found`);
        }
    });

    // Current active section - Start with HOME
    let currentSection = 'HOME'; // Changed from 'ABOUT' to 'HOME'

    // Function to hide all sections
    function hideAllSections() {
        allSections.forEach((section, index) => {
            if (section) {
                // Only hide, don't change positioning
                section.style.setProperty('display', 'none', 'important');
                console.log(`Hidden section ${index}`);
            }
        });
    }

    // Function to show specific section
    function showSection(sectionName) {
        console.log(`🔄 Switching to: ${sectionName}`);
        
        // Hide all sections first
        hideAllSections();
        
        // Show target section
        const targetSection = sectionMapping[sectionName];
        if (targetSection) {
            // Only show, don't change positioning or other styles
            targetSection.style.setProperty('display', 'block', 'important');
            targetSection.scrollTop = 0; // Reset scroll position
            
            console.log(`✅ ${sectionName} section is now visible`);
            console.log(`Display style:`, targetSection.style.display);
            currentSection = sectionName;
            
            // Update active navigation
            updateActiveNavigation(sectionName);
        } else {
            console.error(`❌ Section ${sectionName} not found!`);
        }
    }

    // Function to update active navigation state
    function updateActiveNavigation(activeSectionName) {
        navItems.forEach(navItem => {
            const navText = navItem.textContent.trim().toUpperCase();
            const navParent = navItem.closest('.nav-item');
            
            if (navParent) {
                navParent.classList.remove('active');
                
                if (navText === activeSectionName) {
                    navParent.classList.add('active');
                    console.log(`🎯 ${activeSectionName} navigation activated`);
                }
            }
        });
    }

    // Add click event listeners to navigation items
    navItems.forEach(navItem => {
        navItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            const navText = this.textContent.trim().toUpperCase();
            console.log(`🖱️ Navigation clicked: ${navText}`);
            
            // Check if section exists
            if (sectionMapping[navText]) {
                showSection(navText);
            } else {
                console.warn(`⚠️ No section found for: ${navText}`);
            }
        });
    });

    // Keyboard navigation (Arrow keys)
    document.addEventListener('keydown', function(e) {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            return;
        }
        
        e.preventDefault();
        
        const sectionNames = Object.keys(sectionMapping);
        const currentIndex = sectionNames.indexOf(currentSection);
        let newIndex;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                newIndex = (currentIndex + 1) % sectionNames.length;
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                newIndex = (currentIndex - 1 + sectionNames.length) % sectionNames.length;
                break;
        }
        
        const newSection = sectionNames[newIndex];
        if (sectionMapping[newSection]) {
            showSection(newSection);
        }
    });

    // Initialize the slideshow
    function initializeSlideshow() {
        console.log('🎬 Initializing slideshow...');
        
        // Add CSS styles for slideshow
        addSlideshowStyles();
        
        // Show initial section - Changed to HOME
        showSection('HOME'); // Changed from 'ABOUT' to 'HOME'
        
        console.log('✅ Slideshow initialized successfully!');
    }

    // Add CSS styles for the slideshow (minimal interference)
    function addSlideshowStyles() {
        if (document.querySelector('#slideshow-styles')) {
            return; // Already added
        }

        const style = document.createElement('style');
        style.id = 'slideshow-styles';
        style.textContent = `
            /* Navigation styling with updated gradient colors */
            .nav-item {
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .nav-item:hover {
                transform: translateX(5px);
            }
            
            .nav-item.active {
                transform: translateX(10px);
            }
            
            .nav-item.active a {
                background: linear-gradient(135deg, #B86ADF 0%, #FF6C63 50%, #FFB147 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 600;
            }
            
            .nav-item.active::before {
                content: '';
                position: absolute;
                left: -15px;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 25px;
                background: linear-gradient(135deg, #B86ADF 0%, #FF6C63 50%, #FFB147 100%);
                border-radius: 2px;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from {
                    width: 0;
                    opacity: 0;
                }
                to {
                    width: 4px;
                    opacity: 1;
                }
            }
            
            /* Hover effects */
            .nav-item:hover a {
                background: linear-gradient(135deg, #B86ADF 0%, #FF6C63 50%, #FFB147 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .nav-item.active::before {
                    left: -10px;
                    height: 20px;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('Slideshow styles added');
    }

    window.SlideshowNavigation = {
        showSection: showSection,
        getCurrentSection: () => currentSection,
        getAllSections: () => Object.keys(sectionMapping),
        
        addSection: function(name, element) {
            sectionMapping[name] = element;
            element.style.setProperty('display', 'none', 'important');
            console.log(`Added section: ${name}`);
        }
    };

    initializeSlideshow();
    
});

document.addEventListener('visibilitychange', function() {
    if (!document.hidden && window.SlideshowNavigation) {
    }
});