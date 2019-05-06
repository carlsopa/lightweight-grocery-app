function MinkoffVerification() {
    name = $("#ItemName").val();
    if (name == "mike") {
        console.log("this is a good start");
        OpenToggle();
        $("#content_list").html("");
        MikeNote();
    } else if (name == "ruth") {
        OpenToggle();
        $("#content_list").html("");
        RuthNote();
    } else if (name == "michelle") {
        OpenToggle();
        $("#content_list").html("");
        MichelleNote();
    }
}

function MikeNote() {
    $("#content_list").append(
        '<div>Hi Mike,<br>\
            Sorry to hear about your fall, but glad to hear you are doing better.\
            I wish I could I come out and see you, but I still have to work. \
            I hope that Michelle is keeping you company, I Know that she is very happy to see you. \
            Maybe one day soon I can come out with the smiley car, and we can all go out to dinner again. \
            keep feeling good, and keep positive.<br>\
            Paul</div>'
    );
}

function RuthNote() {
    $("#content_list").append(
        '<div>Hi Ruth,<br>\
            I am glad that you have Michelle there to assist you, and I hope that she is making it easier for you.\
            I want you to know that both you, mike and michelle are in my thoughts and prayers.  I cant imagine what you must be going through. \
            Just remember that if there is ever anything that you need, or that I can do for you please do not hesistate to let me know. \
            I offered to Michelle, that if you needed me to come out for a few days to assist with house prep, or re-working, to let me know. \
            My manager would be willing to work and accomidate me.<br>\
            keep strong, keep going, this is a testiment to not only your strength but also you love and determination to mike. \
            Sending my fondest wishes,<br>\
            Paul</div>'
    );
}

function MichelleNote() {
    $("#content_list").append(
        '<div>Hi Shelli,<br>\
            You get the shortest note, congrats! That is only because you know all I would say\
            I think it is truly amazing what you did and are doing for your parents. I talk and tell you\
             about the goodness in your heart, and this is a testiment and demonstration of all of your good will. \
             Keep on smiling, keep on helping, and keep on making the best out of the situation.<br>\
             I hope that this "easter egg" made you and your parents smile.  Love as always<br>\
             Paulie'
    );
}