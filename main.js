document.addEventListener('DOMContentLoaded', () => {
  // Constants
  const ANIMATION_DURATION = 1050;
  const DELAY_BETWEEN_COUNTERS = 500;
  const COUNTER_ITEM_HEIGHT = 80;
  const SLIDER_ITEMS_TO_SHOW = 3;
  const SLIDER_ITEM_MARGIN = 16;
  const ACCORDION_ANIMATION_DELAY = 150;

  // Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const accordionContainer = document.querySelector('.accordion-container');

  if (accordionContainer) {
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';
    accordionContainer.appendChild(contentContainer);

    const textDefault = `Lorem ipsum dolor sit amet consectetur. Dis morbi sit pharetra gravida tincidunt dolor amet eu. Eget
    tincidunt arcu amet ac euismod proin. Fermentum gravida viverra erat lectus elit quam quisque sed.
    <br />
    <br />
    Massa pellentesque consequat at nam egestas nulla suspendisse venenatis. Amet id nulla mi urna. Viverra
    gravida id ultrices aliquam sed. Nunc duis dictumst semper eu et senectus. Sodales tempor cursus in non
    in blandit. Orci faucibus eu neque et.`;

    const contentData = [
      { title: '1', text: textDefault },
      { title: '2', text: textDefault },
      { title: '3', text: textDefault },
      { title: '4', text: textDefault },
      { title: '5', text: textDefault },
    ];

    contentData.forEach((item, index) => {
      const contentElement = document.createElement('div');
      contentElement.className = 'accordion-content';
      contentElement.innerHTML = `
        <h2>${item.title}</h2>
        <p>${item.text}</p>
      `;

      if (index === 0) {
        contentElement.classList.add('active');
      }

      contentElement.setAttribute(
        'aria-hidden',
        index === 0 ? 'false' : 'true'
      );
      contentElement.id = `accordion-content-${index + 1}`;

      contentContainer.appendChild(contentElement);
    });

    const accordionItems = document.querySelectorAll('.accordion-item');
    const accordionContents = document.querySelectorAll('.accordion-content');
    const icons = document.querySelectorAll('.icon');

    const handleAccordionClick = (index) => {
      const activeContent = document.querySelector('.accordion-content.active');

      if (activeContent) {
        activeContent.classList.add('blink-animation');
      }

      accordionItems.forEach((item, i) => {
        item.classList.remove('active');
        item.setAttribute('aria-expanded', 'false');
        accordionContents[i].classList.remove('active', 'blink-animation');
        accordionContents[i].setAttribute('aria-hidden', 'true');
        icons[i].textContent = '+';
      });

      setTimeout(() => {
        accordionItems[index].classList.add('active');
        accordionItems[index].setAttribute('aria-expanded', 'true');
        accordionContents[index].classList.add('active');
        accordionContents[index].setAttribute('aria-hidden', 'false');
        icons[index].textContent = '-';
      }, ACCORDION_ANIMATION_DELAY);
    };

    accordionHeaders.forEach((header, index) => {
      const accordionItem = header.parentElement;
      accordionItem.setAttribute(
        'aria-expanded',
        index === 0 ? 'true' : 'false'
      );
      header.setAttribute('aria-controls', `accordion-content-${index + 1}`);
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');

      header.addEventListener('click', () => {
        handleAccordionClick(index);
      });

      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAccordionClick(index);
        }
      });
    });

    const firstItem = document.querySelector('.accordion-item');
    if (firstItem) {
      firstItem.classList.add('active');
      firstItem.setAttribute('aria-expanded', 'true');
    }

    const firstIcon = document.querySelector('.icon');
    if (firstIcon) {
      firstIcon.textContent = '-';
    }
  }

  // Counters
  const counterContainers = document.querySelectorAll('.counter-container');

  counterContainers.forEach((container, index) => {
    setTimeout(() => {
      if (container) {
        if (container.classList.contains('special')) {
          const twentyFour = container.querySelector('.twenty-four');
          const seven = container.querySelector('.seven');

          if (twentyFour && seven) {
            requestAnimationFrame(() => {
              twentyFour.style.transform = 'translateY(0)';
              twentyFour.style.opacity = '1';
              seven.style.transform = 'translateY(0)';
              seven.style.opacity = '1';
            });
          }
        } else {
          const track = container.querySelector('.counter-track');
          if (track) {
            const start = parseInt(container.dataset.start, 10);
            const end = parseInt(container.dataset.end, 10);
            const isReverse = container.classList.contains('reverse');

            let numbers = [];
            if (!isReverse) {
              for (let i = start; i <= end; i++) numbers.push(i);
            } else {
              for (let i = start; i >= end; i--) numbers.push(i);
            }

            track.innerHTML = '';
            numbers.forEach((num) => {
              const span = document.createElement('span');
              span.classList.add('benefits-number-item');
              span.textContent = num;
              track.appendChild(span);
            });

            requestAnimationFrame(() => {
              const translateY = -((numbers.length - 1) * COUNTER_ITEM_HEIGHT);
              track.style.transition = `transform ${ANIMATION_DURATION}ms ease-out`;
              track.style.transform = `translateY(${translateY}px)`;
            });
          }
        }
      }
    }, index * (ANIMATION_DURATION + DELAY_BETWEEN_COUNTERS));
  });

  // Slider
  const reviewsContainerWrapper = document.querySelector(
    '.reviews-container-wrapper'
  );
  const reviewsContainer = document.querySelector('.reviews-container');

  if (reviewsContainer) {
    reviewsContainerWrapper.style.overflow = 'hidden';

    const reviewItems = document.querySelectorAll('.review-item');
    const prevButton = document.querySelector('.arrow.prev');
    const nextButton = document.querySelector('.arrow.next');
    const totalItems = reviewItems.length;
    const maxPosition = Math.ceil(totalItems / SLIDER_ITEMS_TO_SHOW) - 1;

    let currentPosition = 0;

    const slideNext = () => {
      if (currentPosition < maxPosition) {
        currentPosition++;
        updateSliderPosition();
      }
      updateSliderState();
    };

    const slidePrev = () => {
      if (currentPosition > 0) {
        currentPosition--;
        updateSliderPosition();
      }
      updateSliderState();
    };

    const updateSliderPosition = () => {
      const itemWidth = reviewItems[0].offsetWidth + SLIDER_ITEM_MARGIN;
      const translateValue = -(
        currentPosition *
        SLIDER_ITEMS_TO_SHOW *
        itemWidth
      );
      reviewsContainer.style.transform = `translateX(${translateValue}px)`;
    };

    const updateSliderState = () => {
      if (prevButton && nextButton) {
        if (currentPosition === 0) {
          prevButton.classList.add('disabled', 'swapped');
          nextButton.classList.remove('disabled', 'swapped');
        } else if (currentPosition === maxPosition) {
          nextButton.classList.add('disabled', 'swapped');
          prevButton.classList.remove('disabled', 'swapped');
        } else {
          prevButton.classList.remove('disabled', 'swapped');
          nextButton.classList.remove('disabled', 'swapped');
        }
      }
    };

    prevButton.addEventListener('click', slidePrev);
    nextButton.addEventListener('click', slideNext);

    updateSliderState();
    updateSliderPosition();

    window.addEventListener('resize', () => {
      updateSliderPosition();
    });
  }

  AOS.init();
});
