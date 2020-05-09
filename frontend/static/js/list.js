$(document).ready(function () {
    console.log('list.js loaded')
    $("#search").click(function () {
        $(".image-list").empty()

        $hashtag = $("input#hashtag").val()
        $date = $("input#date-order").val()

        let data = {
            published: true
        }
        if ($hashtag) {
            data['hashtag'] = $hashtag;
        }
        console.log(data);
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
                    let id = image.id
                    let title = image.title
                    let description = image.description
                    let tag = image.hashtag
                    let date = image.published
                    let thumb_url = image.thumbnail
                    let img_url = image.image

                    $new_div = "<div class='image'>" +
                        "<h2>" + title + "</h4>" +
                        "<button id='delete' onclick='delete_func(this.value)' value='" + id + "'>Delete</button>" +
                        "<button id='update' onclick='update_func(this.value)'value='" + id + "'>Update</button><br>" +
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

function delete_func(id) {

    let img_url = "http://localhost:8000/api/upload/" + id + "/";
    // console.log(img_url);

    $.ajax({
        url: img_url,
        type: 'DELETE',
        data: {},
        success: function (data) {
            console.log("success");
        },
        error: function (data) {
            console.log("error");
        }
    });
}

function update_func(id) {

    let img_url = "http://localhost:8000/api/upload/" + id + "/";
    // console.log(img_url);

    let title = prompt("Title");
    let description = prompt("Description");

    let fd = new FormData
    if (title) { fd.append('title', title); }
    if (description) { fd.append('description', description); }

    $.ajax({
        url: img_url,
        type: 'PUT',
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log("success");
        },
        error: function (data) {
            console.log("error");
        }
    });
}