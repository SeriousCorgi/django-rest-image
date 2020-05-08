$(document).ready(function () {
    console.log('index.js loaded')
    $("#image-submit").click(function () {
        let fd = new FormData();
        let files = $('#file')[0].files[0];
        let title = $("input#title").val()
        let des = $("textarea#description").val()
        fd.append('title', title);
        fd.append('description', des);
        fd.append('image', files);


        console.log(...fd);
        $.ajax({
            url: 'http://localhost:8000/api/upload/',
            type: 'post',
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("success");
                console.log(data);
            },
            error: function (data) {
                console.log("error");

            }
        });
    });
});