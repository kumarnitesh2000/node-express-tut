# Get Request
> curl http://localhost/api/get
>
#### with flags -i get ***header*** Info
>>curl -i http://localhost/api/get
#### only with headers
>> curl --head http://localhost/api/get
#### now we want to add the get info to a txt file
>> curl -o test.txt http://localhost/api/get
#### download the info 
>> curl -O http://localhost/api/get
#### Download an image from internet with rate limit 
curl -O --limit-rate 1000B http://xyz.com/media/lol.png
# Post Request
> curl --data "title=Hello&body=hello World !" http://localhost/api/post
# Put Request
> curl -X **PUT** -d "title=Hello" http://localhost/api/post/2
# Delete Request
> curl -X **DELETE** http://localhost/api/post/2
# Redirection 
     redirection is when we hit http://lol.in it redirects to http://www.lol.in
>> curl http://lol.in 
    not return the actual page so -L flag usage comes in
>> curl -L http://lol.in    
    
