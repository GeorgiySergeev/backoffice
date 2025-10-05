document.addEventListener('DOMContentLoaded', function () {
  let doors = document.querySelectorAll('.door');
  let doorSales = document.querySelectorAll('.door__sales');
  let doorWrapper = document.querySelector('.door__wrapper');

  let spinResultWrapper = document.querySelector('.spin-result-wrapper');
  let spinResultBtn = document.querySelector('.pop-up-button');
  let orderBlock = document.querySelector('.order_block');

  let door1 = document.getElementById('door__1');
  let door2 = document.getElementById('door__2');
  let door3 = document.getElementById('door__3');

  let doorSale1 = document.getElementById('door__sales1');
  let doorSale2 = document.getElementById('door__sales2');
  let doorSale3 = document.getElementById('door__sales3');

  let widgetDoorsSale = '50%';
  let widgetDoorsSale2 = '25%';
  let widgetDoorsSale3 = '10%';

  doors.forEach(function (door) {
    door.addEventListener('click', openDoor);
  });

  function openDoor(e) {
    e.currentTarget.classList.add('open');

    doorSales.forEach(function (sale) {
      if (door1.classList.contains('open')) {
        doorSale1.innerHTML = widgetDoorsSale;

        doorSale2.innerHTML = widgetDoorsSale2;

        doorSale3.innerHTML = widgetDoorsSale3;
      } else if (door2.classList.contains('open')) {
        doorSale2.innerHTML = widgetDoorsSale;

        doorSale1.innerHTML = widgetDoorsSale3;

        doorSale3.innerHTML = widgetDoorsSale2;
      } else if (door3.classList.contains('open')) {
        doorSale1.innerHTML = widgetDoorsSale2;

        doorSale3.innerHTML = widgetDoorsSale;

        doorSale2.innerHTML = widgetDoorsSale3;
      }
    });

    for (let i = 0; i < doors.length; i++) {
      if (!doors[i].classList.contains('open')) {
        setTimeout(function () {
          doors[i].classList.add('open');
        }, 2000);
      }
    }

    for (let j = 0; j < doors.length; j++) {
      doors[j].removeEventListener('click', openDoor);
    }

    showResultWindow();
    showForm();
  }

  function showResultWindow() {
    setTimeout(function () {
      spinResultWrapper.style.display = 'block';
    }, 3000);
  }

  function showForm() {
    setTimeout(function () {
      doorWrapper.style.display = 'none';
      orderBlock.style.display = 'block';
      start_timer();
    }, 4000);
  }

  let time = 600;
  let intr;

  function start_timer() {
    intr = setInterval(tick, 1000);
  }

  function tick() {
    time = time - 1;
    let mins = Math.floor(time / 60);
    let secs = time - mins * 60;
    if (mins == 0 && secs == 0) {
      clearInterval(intr);
    }
    secs = secs >= 10 ? secs : '0' + secs;
    mins = mins >= 10 ? mins : '0' + mins;
    document.querySelector('#min').innerHTML = mins;
    document.querySelector('#sec').innerHTML = secs;
  }

  spinResultWrapper.addEventListener('click', function (e) {
    e.preventDefault();
    spinResultWrapper.style.display = 'none';
    document.querySelector('.toform').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Get all buttons with anchor links
  const anchorButtons = document.querySelectorAll('a[href^="#"]');

  anchorButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Remove anchor from URL without affecting history
        window.history.pushState({}, '', window.location.pathname);
      }
    });
  });
});
