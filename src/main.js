document.addEventListener('DOMContentLoaded', () => {
  // Constants
  const ANIMATION_DURATION = 2000
  const DELAY_BETWEEN_COUNTERS = 800
  const TEXT_TO_COUNTER_DELAY = 400
  const COUNTER_ITEM_HEIGHT = 80

  const SLIDER_ITEMS_TO_SHOW = {
    desktop: 3,
    tablet: 2,
    mobile: 1
  }
  const SLIDER_ITEM_MARGIN = 16
  const ACCORDION_ANIMATION_DELAY = 150

  // Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header')
  const accordionContainer = document.querySelector('.accordion-container')

  if (accordionContainer) {
    const contentContainer = document.createElement('div')
    contentContainer.className = 'content-container'
    accordionContainer.appendChild(contentContainer)

    const textDefault = `Lorem ipsum dolor sit amet consectetur. Dis morbi sit pharetra gravida tincidunt dolor amet eu. Eget
  tincidunt arcu amet ac euismod proin. Fermentum gravida viverra erat lectus elit quam quisque sed.
  <br />
  <br />
  Massa pellentesque consequat at nam egestas nulla suspendisse venenatis. Amet id nulla mi urna. Viverra
  gravida id ultrices aliquam sed. Nunc duis dictumst semper eu et senectus. Sodales tempor cursus in non
  in blandit. Orci faucibus eu neque et.`

    const contentData = [
      { title: '1', text: textDefault },
      { title: '2', text: textDefault },
      { title: '3', text: textDefault },
      { title: '4', text: textDefault },
      { title: '5', text: textDefault }
    ]

    const updateAccordionHeadings = () => {
      const isMobileOrTablet = window.innerWidth <= 768
      accordionContents.forEach(content => {
        const heading = content.querySelector('h2')
        if (heading) {
          heading.textContent = isMobileOrTablet ? 'Answer' : heading.dataset.number
        }
      })
    }

    contentData.forEach((item, index) => {
      const contentElement = document.createElement('div')
      contentElement.className = 'accordion-content'
      contentElement.innerHTML = `
      <h2 data-number="${item.title}">${window.innerWidth <= 768 ? 'Answer' : item.title}</h2>
      <p>${item.text}</p>
    `
      contentElement.setAttribute('aria-hidden', 'true')
      contentElement.id = `accordion-content-${index + 1}`
      contentContainer.appendChild(contentElement)
    })

    const accordionItems = document.querySelectorAll('.accordion-item')
    const accordionContents = document.querySelectorAll('.accordion-content')
    const icons = document.querySelectorAll('.icon')

    const handleAccordionClick = index => {
      const isMobileOrTablet = window.innerWidth <= 768
      const activeContent = document.querySelector('.accordion-content.active')
      const clickedItem = accordionItems[index]
      const isClickedItemActive = clickedItem.classList.contains('active')

      if (activeContent) {
        activeContent.classList.add('blink-animation')
      }

      if (isClickedItemActive) {
        clickedItem.classList.remove('active')
        clickedItem.setAttribute('aria-expanded', 'false')
        accordionContents[index].classList.remove('active', 'blink-animation')
        accordionContents[index].setAttribute('aria-hidden', 'true')
        icons[index].textContent = '+'

        if (isMobileOrTablet) {
          contentContainer.appendChild(accordionContents[index])
        }
        return
      }

      if (isMobileOrTablet) {
        const selectedContent = accordionContents[index]
        const header = accordionHeaders[index]

        accordionItems.forEach((item, i) => {
          item.classList.remove('active')
          item.setAttribute('aria-expanded', 'false')
          accordionContents[i].classList.remove('active', 'blink-animation')
          accordionContents[i].setAttribute('aria-hidden', 'true')
          icons[i].textContent = '+'
          contentContainer.appendChild(accordionContents[i])
        })

        setTimeout(() => {
          accordionItems[index].classList.add('active')
          accordionItems[index].setAttribute('aria-expanded', 'true')
          selectedContent.classList.add('active')
          selectedContent.setAttribute('aria-hidden', 'false')
          icons[index].textContent = '-'

          header.parentNode.insertBefore(selectedContent, header.nextSibling)
          selectedContent.style.background = 'var(--blue-400)'
          const padding = window.innerWidth <= 420 ? '16px' : '40px'
          selectedContent.style.padding = padding
        }, ACCORDION_ANIMATION_DELAY)
      } else {
        accordionItems.forEach((item, i) => {
          item.classList.remove('active')
          item.setAttribute('aria-expanded', 'false')
          accordionContents[i].classList.remove('active', 'blink-animation')
          accordionContents[i].setAttribute('aria-hidden', 'true')
          icons[i].textContent = '+'
        })

        setTimeout(() => {
          accordionItems[index].classList.add('active')
          accordionItems[index].setAttribute('aria-expanded', 'true')
          accordionContents[index].classList.add('active')
          accordionContents[index].setAttribute('aria-hidden', 'false')
          icons[index].textContent = '-'
        }, ACCORDION_ANIMATION_DELAY)
      }
    }

    const initializeAccordion = () => {
      const isDesktop = window.innerWidth > 768
      const firstItem = accordionItems[0]
      const firstContent = accordionContents[0]
      const firstIcon = icons[0]

      if (isDesktop) {
        if (firstItem && firstContent && firstIcon) {
          firstItem.classList.add('active')
          firstContent.classList.add('active')
          firstIcon.textContent = '-'
        }
      } else {
        if (firstItem && firstContent && firstIcon) {
          firstItem.classList.remove('active')
          firstContent.classList.remove('active')
          firstIcon.textContent = '+'
        }
      }
    }

    window.addEventListener('resize', () => {
      const isMobileOrTablet = window.innerWidth <= 768
      const activeItem = document.querySelector('.accordion-item.active')
      updateAccordionHeadings()
      if (activeItem) {
        const index = Array.from(accordionItems).indexOf(activeItem)

        if (isMobileOrTablet) {
          if (index === 0) {
            activeItem.classList.remove('active')
            accordionContents[0].classList.remove('active')
            icons[0].textContent = '+'
          } else {
            const activeContent = accordionContents[index]
            const header = accordionHeaders[index]
            header.parentNode.insertBefore(activeContent, header.nextSibling)
            activeContent.style.background = 'var(--blue-400)'
            activeContent.style.padding = '8px'
          }
        } else {
          accordionContents.forEach(content => {
            contentContainer.appendChild(content)
            content.style.background = ''
            content.style.padding = ''
          })
        }
      } else if (!isMobileOrTablet) {
        accordionItems[0].classList.add('active')
        accordionContents[0].classList.add('active')
        icons[0].textContent = '-'
      }
    })

    accordionHeaders.forEach((header, index) => {
      header.setAttribute('aria-controls', `accordion-content-${index + 1}`)
      header.setAttribute('role', 'button')
      header.setAttribute('tabindex', '0')

      header.addEventListener('click', () => {
        handleAccordionClick(index)
      })

      header.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleAccordionClick(index)
        }
      })
    })

    initializeAccordion()
    updateAccordionHeadings()
  }
  // Benefits
  const counterContainers = document.querySelectorAll('.counter-container')
  const isElementInViewport = el => {
    const rect = el.getBoundingClientRect()
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  }

  counterContainers.forEach((container, index) => {
    if (isElementInViewport(container)) {
      setTimeout(() => {
        if (container.classList.contains('special')) {
          const twentyFour = container.querySelector('.twenty-four')
          const seven = container.querySelector('.seven')

          if (twentyFour && seven) {
            twentyFour.style.transform = 'translateY(20px)'
            twentyFour.style.opacity = '0'
            seven.style.transform = 'translateY(20px)'
            seven.style.opacity = '0'

            requestAnimationFrame(() => {
              twentyFour.style.transition = 'transform 0.9s ease-out, opacity 1.5s ease-out'
              seven.style.transition = 'transform 0.9s ease-out, opacity 1.5s ease-out'

              twentyFour.style.transform = 'translateY(0)'
              twentyFour.style.opacity = '1'
              seven.style.transform = 'translateY(0)'
              seven.style.opacity = '1'
            })
          }
        } else {
          startCounterAnimation(container)
        }
      }, index * (ANIMATION_DURATION + DELAY_BETWEEN_COUNTERS))
    }
  })

  window.addEventListener(
    'scroll',
    () => {
      counterContainers.forEach((container, index) => {
        if (isElementInViewport(container) && !container.classList.contains('animated')) {
          container.classList.add('animated')
          setTimeout(() => {
            if (container.classList.contains('special')) {
              const twentyFour = container.querySelector('.twenty-four')
              const seven = container.querySelector('.seven')

              if (twentyFour && seven) {
                twentyFour.style.transform = 'translateY(20px)'
                twentyFour.style.opacity = '0'
                seven.style.transform = 'translateY(20px)'
                seven.style.opacity = '0'

                requestAnimationFrame(() => {
                  twentyFour.style.transition = 'transform 0.9s ease-out, opacity 1.5s ease-out'
                  seven.style.transition = 'transform 0.9s ease-out, opacity 1.5s ease-out'

                  twentyFour.style.transform = 'translateY(0)'
                  twentyFour.style.opacity = '1'
                  seven.style.transform = 'translateY(0)'
                  seven.style.opacity = '1'
                })
              }
            } else {
              startCounterAnimation(container)
            }
          }, index * (ANIMATION_DURATION + DELAY_BETWEEN_COUNTERS))
        }
      })
    },
    { passive: true }
  )

  function startCounterAnimation(container) {
    if (!container) return

    if (container.classList.contains('special')) {
      const twentyFour = container.querySelector('.twenty-four')
      const seven = container.querySelector('.seven')

      if (twentyFour && seven) {
        twentyFour.style.transform = 'translateY(20px)'
        twentyFour.style.opacity = '0'
        seven.style.transform = 'translateY(20px)'
        seven.style.opacity = '0'

        requestAnimationFrame(() => {
          twentyFour.style.transition = 'transform 0.9s ease-out, opacity 1.5s ease-out'
          seven.style.transition = 'transform 0.9s ease-out, opacity 1.5s ease-out'

          twentyFour.style.transform = 'translateY(0)'
          twentyFour.style.opacity = '1'
          seven.style.transform = 'translateY(0)'
          seven.style.opacity = '1'
        })
      }
    } else {
      const track = container.querySelector('.counter-track')
      if (track) {
        const start = parseInt(container.dataset.start, 10)
        const end = parseInt(container.dataset.end, 10)
        const isReverse = container.classList.contains('reverse')

        let numbers = []
        if (!isReverse) {
          for (let i = start; i <= end; i++) numbers.push(i)
        } else {
          for (let i = start; i >= end; i--) numbers.push(i)
        }

        track.style.transition = 'none'
        track.style.transform = 'translateY(0)'

        track.innerHTML = ''
        numbers.forEach(num => {
          const span = document.createElement('span')
          span.classList.add('benefits-number-item')
          span.textContent = num
          track.appendChild(span)
        })

        track.offsetHeight

        requestAnimationFrame(() => {
          const translateY = -((numbers.length - 1) * COUNTER_ITEM_HEIGHT)
          track.style.transition = `transform ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
          track.style.transform = `translateY(${translateY}px)`
        })
      }
    }
  }

  const benefitsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const benefitsSection = entry.target
          const descriptions = benefitsSection.querySelectorAll('.benefits-desc')
          const counters = benefitsSection.querySelectorAll('.counter-container')

          descriptions.forEach(desc => {
            desc.classList.add('visible')
          })

          setTimeout(() => {
            counters.forEach((counter, index) => {
              setTimeout(() => {
                counter.classList.add('visible')
                startCounterAnimation(counter)
              }, index * DELAY_BETWEEN_COUNTERS)
            })
          }, TEXT_TO_COUNTER_DELAY)

          benefitsObserver.unobserve(benefitsSection)
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: '50px'
    }
  )
  const benefitsSection = document.querySelector('.benefits')
  if (benefitsSection) {
    benefitsObserver.observe(benefitsSection)
  }

  // Slider
  const reviewsContainerWrapper = document.querySelector('.reviews-container-wrapper')
  const reviewsContainer = document.querySelector('.reviews-container')

  if (reviewsContainer) {
    reviewsContainerWrapper.style.overflow = 'hidden'

    const reviewItems = document.querySelectorAll('.review-item')
    const prevButton = document.querySelector('.arrow.prev')
    const nextButton = document.querySelector('.arrow.next')

    let currentPosition = 0

    const getItemsToShow = () => {
      if (window.innerWidth <= 420) {
        return SLIDER_ITEMS_TO_SHOW.mobile
      } else if (window.innerWidth <= 768) {
        return SLIDER_ITEMS_TO_SHOW.tablet
      }
      return SLIDER_ITEMS_TO_SHOW.desktop
    }

    const getMaxPosition = () => {
      const itemsToShow = getItemsToShow()
      return Math.ceil(reviewItems.length / itemsToShow) - 1
    }

    const updateSliderPosition = () => {
      const itemsToShow = getItemsToShow()
      const itemWidth = reviewItems[0].offsetWidth + SLIDER_ITEM_MARGIN
      const translateValue = -(currentPosition * itemsToShow * itemWidth)
      reviewsContainer.style.transform = `translateX(${translateValue}px)`
    }

    const updateSliderState = () => {
      const maxPosition = getMaxPosition()

      if (prevButton && nextButton) {
        if (currentPosition === 0) {
          prevButton.classList.add('disabled', 'swapped')
          nextButton.classList.remove('disabled', 'swapped')
        } else if (currentPosition === maxPosition) {
          nextButton.classList.add('disabled', 'swapped')
          prevButton.classList.remove('disabled', 'swapped')
        } else {
          prevButton.classList.remove('disabled', 'swapped')
          nextButton.classList.remove('disabled', 'swapped')
        }
      }
    }

    const slideNext = () => {
      const maxPosition = getMaxPosition()
      if (currentPosition < maxPosition) {
        currentPosition++
        updateSliderPosition()
        updateSliderState()
      }
    }

    const slidePrev = () => {
      if (currentPosition > 0) {
        currentPosition--
        updateSliderPosition()
        updateSliderState()
      }
    }

    prevButton.addEventListener('click', slidePrev)
    nextButton.addEventListener('click', slideNext)

    window.addEventListener('resize', () => {
      const maxPosition = getMaxPosition()
      if (currentPosition > maxPosition) {
        currentPosition = maxPosition
      }
      updateSliderPosition()
      updateSliderState()
    })

    updateSliderState()
    updateSliderPosition()
    window.addEventListener('resize', () => {
      updateSliderPosition()
    })
  }
  AOS.init()
})
