function getData() {
  var xh = new XMLHttpRequest();
  xh.open("GET", "./static/details.json", true);
  //console.log(xh)
  // xh.setRequestHeader("Access-Control-Allow-Origin","*")
  xh.setRequestHeader("Content-Type", "application/json");
  // xh.responseType = 'json';
  xh.send();
  console.log(xh)
  xh.onload = function () {
    if (this.status == 200) {
      // console.log(this.responseText)
      var data = JSON.parse(this.responseText);
      // console.log(xh.responseText)
      var rankset = new Set();
      data.forEach((member)=>
        {rankset.add(member.qcomplete_no);}
      );

      const rankarray = [...rankset];

      var i = 1;
      data.forEach((member) => {
        let newRow = document.createElement("li");

        member.track1.reverse();
        member.track2.reverse();

        rank=rankarray.indexOf(member.qcomplete_no)+1;

        newRow.classList = "c-list__item";

        if(member.track1.length==0){
        newRow.innerHTML = `
                    <div class="c-list__grid">
                        <div class="c-flag c-kudos">${i}</div>
                        <div class="c-flag c-place u-bg--transparent">${rank}</div>
                        <div class="c-media">
                            <img class="c-avatar c-media__img" src="${member.dp}" />
                            <div class="c-media__content">
                                <div class="c-media__title">${member.name}</div>
                                <br>
                                <a class="c-media__link "><b>Track 2:</b><ol><li> ${member.track2.join('</li><li>')}</li></ol></a>
                            </div>
                        </div>
                        <div class="u-text--right c-kudos">
                            <div class="u-mt--8">
                                <strong>${member.qcomplete_no}</strong>
                            </div>
                        </div>
                    </div>
                `;
          }else if(member.track2.length==0){
            newRow.innerHTML = `
                        <div class="c-list__grid">
                            <div class="c-flag c-kudos">${i}</div>
                            <div class="c-flag c-place u-bg--transparent">${rank}</div>
                            <div class="c-media">
                                <img class="c-avatar c-media__img" src="${member.dp}" />
                                <div class="c-media__content">
                                    <div class="c-media__title">${member.name}</div>
                                    <br>
                                    <a class="c-media__link "><b>Track 1:</b><ol><li> ${member.track1.join('</li><li>')}</li></ol></a>
                                </div>
                            </div>
                            <div class="u-text--right c-kudos">
                                <div class="u-mt--8">
                                    <strong>${member.qcomplete_no}</strong>
                                </div>
                            </div>
                        </div>
                    `;
          }else{
            newRow.innerHTML = `
                        <div class="c-list__grid">
                            <div class="c-flag c-kudos">${i}</div>
                            <div class="c-flag c-place u-bg--transparent">${rank}</div>
                            <div class="c-media">
                                <img class="c-avatar c-media__img" src="${member.dp}" />
                                <div class="c-media__content">
                                    <div class="c-media__title">${member.name}</div>
                                    <br>
                                    <a class="c-media__link "><b>Track 1:</b><ol><li> ${member.track1.join('</li><li>')}</li></ol></a>
                                    <br><br>
                                    <a class="c-media__link "><b>Track 2:</b><ol><li> ${member.track2.join('</li><li>')}</li></ol></a>
                                </div>
                            </div>
                            <div class="u-text--right c-kudos">
                                <div class="u-mt--8">
                                    <strong>${member.qcomplete_no}</strong>
                                </div>
                            </div>
                        </div>
                    `;

          }

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

        if (i%2 == 0){
          newRow.classList.add("bg-even");
        }else{
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
