var socket = io.connect("https://mellow-entertaining-celery.glitch.me/");
var fetchedata;
var storeid;
var studemailid;
// // // var socket = io();
socket.on("welcome", (data)=>{
  
  console.log("incomming ", data)
});

socket.on('error', function (err) {
    console.log(err);
});


socket.on("popo", (data)=>{
    //console.log("first line " + data);
    loadData(data);
    //console.log(data);
    //console.log(data..question);

});

function loadData(data) {
    
    $(document).ready(function(){

        var timeleft = 20;
        var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
        }, 1000);



        var i = 0
        for(element in data) {
            var testobj = data[element];
            console.log(" _id is ..")
            console.log(testobj._id)
            this.storeid = testobj._id
            $("#box").append("<div class='he"+element+" poll'>"+testobj.question+"</div>");
            // $(".he"+element).append("<div><button class='good' id='good')>Yes</button> <button class='danger' id='danger')>No</button></div>")
            studemailid = 'prana.soneji@spit.ac.in';
            $(".he"+element).append("<div><form action='https://mellow-entertaining-celery.glitch.me/api/anspoll' method='post'> <input type='hidden' id='id' name='id' value='"+testobj._id+"'> <input type='hidden' id='emailid' name='emailid' value='"+studemailid+"'> <input type='radio' id='yes' name='ansval' value='true'><label for='yes'>Yes</label><br><br><input type='radio' id='no' name='ansval' value='false'><label for='no'>No</label><br> <input type='submit' name='submit' value'submit'></form><Br><div id='countdown'></div>")
            
            // document.querySelector('.he').innerHTML = element;
            //i = i + 1;
        }
        // data.forEach(element => {
        //     $("#box").append("<div class='he"+i+" poll'>"+element.id.question+"</div>");
        //     $(".he"+i).append("<div><button class='good'>Yes</button> <button class='danger'>No</button></div>")
        //     // document.querySelector('.he').innerHTML = element;
        //     i = i + 1;
        // });
        setTimeout(function(){ $("#box").empty(); }, 20000);

        // $("good").click(function(){
        //     console.log('yes');
        // });
        
        // function myYes(){
        
        // }
    
        // $("good").click(function(){
        //     console.log('no');
        // });
    
        // function myNo(){
        
        // }



    });


    
}


// $("#box").append("<div class='he"+i+" poll'>"+element.id.question+"</div>");
//             $(".he"+i).append("<div><button class='good'>Yes</button> <button class='danger'>No</button></div>")
//             // document.querySelector('.he').innerHTML = element;
//             i = i + 1;