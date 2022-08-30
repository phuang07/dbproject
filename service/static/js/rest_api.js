$(function () {
    $("#submit-btn").click(function () {

        let age = $("#age").val();
        let gender = $("#gender").val();
        let distance = $("#race_distance").val();
        let time = $("#race_time").val();

        let display_string = "Based on the following information:<br />";

        display_string += 'Age: ' + age + '<br />';
        display_string += 'Gender: ' + gender + '<br />';
        display_string += 'Race Distance: ' + distance + ' meters<br />';
        display_string += 'Race Time: ' + time + '<br />';

        $('#runner-info').html(display_string);
        $('#runner-quote').html("Please wait while quote being generated...");

        let data = {
            "age": age,
            "gender": gender,
            "distance": distance,
            "time": time,
        };

        let ajax = $.ajax({
            type: "POST",
            url: '/get-runner-quote',
            contentType: "application/json",
            data: JSON.stringify(data)
        });

        ajax.done(function(res) {
            console.log(res);
            $('#runner-quote').html('<p>Your fitness score is: ' + res.fitness_score + '<br /> Your premium will be: $'+res.quote+'</p>');
        });
    });

})
