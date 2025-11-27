const data = [
  {
    place: 'Data Science',
    title: 'Data',
    title2: 'Science',
    description: 'Data science is broader: it combines data collection, cleaning, analysis, modeling, but often extends to building predictive models, extracting insights from large & complex datasets (structured or unstructured), and sometimes deploying models.',
    image: 'https://cdn.shopaccino.com/igmguru/articles/Career-In-Data-Science.webp?v=532'
  },
  {
    place: 'Artificial Intelligence',
    title: 'Artificial',
    title2: 'Intelligence',
    description: 'Artificial Intelligence is the broad field concerned with enabling machines to perform tasks that normally require human intelligence: reasoning, decision-making, language understanding, vision, planning, etc.',
    image: 'https://www.toolshero.com/wp-content/uploads/2023/01/artificial-intelligence-ai-toolshero.jpg'
  },
  {
    place: 'Data Analysis',
    title: 'Data',
    title2: 'Analysis',
    description: 'Data analysis is the process of examining data — collecting, cleaning, transforming, modeling, interpreting — to extract meaningful insights, detect patterns or trends, summarise data, support decision-making.',
    image: 'https://learnerbits.com/wp-content/uploads/2023/10/data-analysis-1024x576.webp'
  },
  {
    place: 'Machine Learning',
    title: 'Machine',
    title2: 'Learning',
    description: 'ML is a subfield of AI: it gives machines the ability to learn from data, detect patterns, improve over time, without being explicitly programmed for every scenario.',
    image: 'https://f.hubspotusercontent40.net/hubfs/2488049/Machine%20Learning%20Cover%20Image.jpg'
  },
  {
    place: 'Deep Learning',
    title: 'Deep',
    title2: 'Learning',
    description: 'Deep Learning is a specialized subfield of ML — using neural networks with many layers (deep neural networks) to automatically learn representations and patterns, especially from complex or unstructured data (images, text, audio).',
    image: 'https://miro.medium.com/v2/1*I5O6NX_DIKYI1VBuLfX77Q.jpeg'
  },
  {
    place: 'Computer Vision',
    title: 'Computer',
    title2: 'Vision',
    description: 'Computer Vision is a field (within AI) that aims to enable machines – software / algorithms / systems — to "see", interpret, and make sense of visual data (images, video) in ways similar to human visual perception.',
    image: 'https://www.rishabhsoft.com/wp-content/uploads/2023/04/Blog-Banner-Computer-Vision.jpg'
  },
];

const _ = (id) => document.getElementById(id);
const cards = data.map((i, index) => `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`).join('');
const cardContents = data.map((i, index) => `<div class="card-content" id="card-content-${index}">
  <div class="content-start"></div>
  <div class="content-place">${i.place}</div>
  <div class="content-title-1">${i.title}</div>
  <div class="content-title-2">${i.title2}</div>
</div>`).join('');
const slideNumbers = data.map((_, index) => `<div class="item" id="slide-item-${index}">${index + 1}</div>`).join('');

_('demo').innerHTML = cards + cardContents;
_('slide-numbers').innerHTML = slideNumbers;

const range = (n) => Array(n).fill(0).map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;
let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";
let clicks = 0;
let animationInProgress = false;

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  
  // Update positions based on window size
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: width,
    height: height,
    zIndex: 20,
  });
  
  gsap.set(getCardContent(active), { 
    x: 0, 
    y: 0, 
    opacity: 0 
  });
  
  gsap.set(detailsActive, { 
    opacity: 0, 
    zIndex: 22, 
    x: -200 
  });
  
  gsap.set(detailsInactive, { 
    opacity: 0, 
    zIndex: 12 
  });
  
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    
    gsap.set(getSliderItem(i), { 
      x: (index + 1) * numberSize 
    });
  });

  gsap.set(".indicator", { x: -width });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });
  
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  
  gsap.to("#pagination", { 
    y: 0, 
    opacity: 1, 
    ease, 
    delay: startDelay 
  });
  
  gsap.to(detailsActive, { 
    opacity: 1, 
    x: 0, 
    ease, 
    delay: startDelay 
  });
}

function step() {
  return new Promise((resolve) => {
    order.push(order.shift());
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent = data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        
        gsap.set(getSliderItem(prv), { 
          x: rest.length * numberSize 
        });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        
        animationInProgress = false;
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        
        gsap.to(getSliderItem(i), { 
          x: (index + 1) * numberSize, 
          ease 
        });
      }
    });
  });
}

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  
  if (!animationInProgress) {
    animationInProgress = true;
    await step();
  }
  
  loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Fallback for failed images
      console.warn(`Failed to load image: ${src}`);
      resolve(null);
    };
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
    
    // Add click handlers for navigation arrows
    document.querySelector('.arrow-left').addEventListener('click', () => {
      if (!animationInProgress) {
        animationInProgress = true;
        order.unshift(order.pop());
        detailsEven = !detailsEven;
        step();
      }
    });
    
    document.querySelector('.arrow-right').addEventListener('click', () => {
      if (!animationInProgress) {
        animationInProgress = true;
        step();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      const [active, ...rest] = order;
      const { innerHeight: height, innerWidth: width } = window;
      
      offsetTop = height - 430;
      offsetLeft = width - 830;
      
      gsap.set(getCard(active), {
        width: width,
        height: height,
      });
      
      gsap.set("#pagination", {
        top: offsetTop + 330,
        left: offsetLeft,
      });
      
      rest.forEach((i, index) => {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), {
          x: xNew,
          y: offsetTop,
        });
        
        gsap.set(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
        });
      });
    });
    
  } catch (error) {
    console.error("One or more images failed to load", error);
    // Continue even if images fail to load
    init();
  }
}

// Mobile menu toggle function
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('open');
}

start();