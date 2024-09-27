document.querySelectorAll('.draggable').forEach(dragElement);

    const zones = {
      green: document.querySelector('#green-zone'),
      blue: document.querySelector('#blue-zone'),
      red: document.querySelector('#red-zone'),
      grayscale: document.querySelector('#grayscale-zone'),
    };

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      elmnt.querySelector('.header').onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        const zone = getCurrentZone(elmnt, zones);
        if (zone) {
          applyFilter(elmnt, zone);
        } else {
          elmnt.style.filter = ''; // Remove filter if outside any zone
        }
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }

      function getCurrentZone(elmnt, zones) {
        for (const [key, zone] of Object.entries(zones)) {
          const rect = elmnt.getBoundingClientRect();
          const zoneRect = zone.getBoundingClientRect();
          if (
            rect.right > zoneRect.left &&
            rect.left < zoneRect.right &&
            rect.bottom > zoneRect.top &&
            rect.top < zoneRect.bottom
          ) {
            return key;
          }
        }
        return null;
      }

      function applyFilter(elmnt, zone) {
        switch (zone) {
          case 'green':
            elmnt.style.filter = 'sepia(1) saturate(100%) hue-rotate(90deg)'; // Green effect
            break;
          case 'blue':
            elmnt.style.filter = 'sepia(1) saturate(100%) hue-rotate(150deg)'; // Blue effect
            break;
          case 'red':
            elmnt.style.filter = 'sepia(1) saturate(150%) hue-rotate(-30deg)'; // Red effect
            break;
          case 'grayscale':
            elmnt.style.filter = 'grayscale(100%)'; // Grayscale effect
            break;
          default:
            elmnt.style.filter = '';
        }
      }
    }


  