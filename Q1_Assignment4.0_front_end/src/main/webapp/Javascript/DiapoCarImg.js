//Function that allows you to switch from one photo to another 
function dplcmt(n)
{
	showPicture(position += n);
}

//Function that allows to display or not the images according to the position in the table
function showPicture(n)
{
	var i;
	var x = document.getElementsByClassName("diapo");

	for (i=0; i<x.length; i++)
	{
		x[i].style.display = "none";
	}

	if(n>x.length){position=1}
	if(n<1){position=x.length}
	x[position-1].style.display = "block";
}