$(document).ready(function () {
    console.log('list.js loaded')
    $("#search").click(function () {
        $(".image-list").empty()

        $hashtag = $("input#hashtag").val()
        $date = $("input#date-order").val()

        let data = {
            published: true
        }
        if (!($hashtag === "")) {
            data.append({ hashtag: hashtag });
        }
        let url = "http://localhost:8000/api/upload/"
        $.get(url, data, function (data, status) {
            if (status == "success") {
                if ($date == "newer") {
                    data.sort(function (a, b) {
                        return new Date(a.published).getTime() - new Date(b.published).getTime();
                    });
                } else {
                    data.sort(function (a, b) {
                        return new Date(b.published).getTime() - new Date(a.published).getTime();
                    });
                }

                data.forEach(image => {
                    let title = image.title
                    let description = image.description
                    let tag = image.hashtag
                    let date = image.published
                    let thumb_url = image.thumbnail
                    let img_url = image.image

                    $new_div = "<div class='image'>" +
                        "<h2>" + title + "</h4>" +
                        "<a href='" + img_url + "'><img src='" + thumb_url + "'></a>" +
                        "<p>" + description + "</p>" +
                        "<p>" + date + "</p>" +
                        "</div>" + "<hr style='width:50%'>"
                    $(".image-list").append($new_div).show();
                });
            }
        })
    });
});