function getData() {
  var xh = new XMLHttpRequest();
  xh.open("GET", "./static/details.json", true);
  xh.setRequestHeader("Content-Type", "application/json");
  xh.send();
  xh.onload = function () {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      var rankset = new Set();
      data.forEach((member) => {
        rankset.add(member.qcomplete_no);
      });

      const rankarray = [...rankset];

      var i = 1;
      data.forEach((member) => {
        let newRow = document.createElement("li");

        member.lab.reverse();
        member.quest.reverse();
        member.course.reverse();

        rank = rankarray.indexOf(member.qcomplete_no) + 1;

        newRow.classList = "c-list__item";

        newRow.innerHTML = `
                        <div class="c-list__grid">
                            <div class="c-flag c-kudos">${i}</div>
                            <div class="c-flag c-place u-bg--transparent">${rank}</div>
                            <div class="c-media">
                                <div class="c-media__content">
                                    <div class="c-media__title">${
                                      member.name
                                    }</div>
                                    
                                    ${
                                      member.lab.length > 0
                                        ? `<br><a class="c-media__link "><b>Lab:</b><ol><li> ${member.lab.join(
                                            "</li><li>"
                                          )}</li></ol></a>`
                                        : ""
                                    }
                                    
                                    ${
                                      member.quest.length > 0
                                        ? `<br><br><a class="c-media__link "><b>Quest:</b><ol><li> ${member.quest.join(
                                            "</li><li>"
                                          )}</li></ol></a>`
                                        : ""
                                    }
                                    
                                    ${
                                      member.course.length > 0
                                        ? `<br><br><a class="c-media__link "><b>Course:</b><ol><li> ${member.course.join(
                                            "</li><li>"
                                          )}</li></ol></a>`
                                        : ""
                                    }
                                </div>
                            </div>
                            <div class="u-text--right c-kudos">
                                <div class="u-mt--8">
                                    <strong>${member.qcomplete_no}</strong>
                                </div>
                            </div>
                        </div>
                    `;

        if (rank === 1) {
          newRow.querySelector(".c-place").classList.add("u-text--dark");
          newRow.querySelector(".c-place").classList.add("u-bg--yellow");
          newRow.querySelector(".c-kudos").classList.add("u-text--yellow");
        } else if (rank === 2) {
          newRow.querySelector(".c-place").classList.add("u-text--dark");
          newRow.querySelector(".c-place").classList.add("u-bg--teal");
          newRow.querySelector(".c-kudos").classList.add("u-text--teal");
        } else if (rank === 3) {
          newRow.querySelector(".c-place").classList.add("u-text--dark");
          newRow.querySelector(".c-place").classList.add("u-bg--orange");
          newRow.querySelector(".c-kudos").classList.add("u-text--orange");
        }

        if (i % 2 == 0) {
          newRow.classList.add("bg-even");
        } else {
          newRow.classList.add("bg-odd");
        }

        i++;
        list.appendChild(newRow);
      });
    } else {
      console.log("Something went wrong.");
    }
  };
}
