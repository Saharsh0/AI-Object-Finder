object_status = "";
objects = [];
object_name = ""
object_found = false;

function setup()
{
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(400, 300);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 400, 300);
    if(object_status != "")
    {
        objectDetector.detect(video, gotResult);
        
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " "+percent +"%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name)
            {
                object_found = true
            }
            
        }

        if(object_found == true)
        {
            document.getElementById("name_of_object").innerHTML = object_name + " Detected!";
        }
        else
        {
            document.getElementById("name_of_object").innerHTML = object_name + "  Not Detected";
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("model Loaded!");
    object_status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results);
    objects = results;
}