## Website Performance Optimization portfolio project


### Get it started

* clone or download
* open dist folder for optimized version
* open index.html

#### Part 1: Optimize PageSpeed Insights score for index.html

* move contents from views folder to root folders
* smaller version of pizzeria.jpg for use in index.html
* add async for google analytics
* load fonts asynchronously
* added media attribute for print.css 
* minify

#### Part 2: Optimize Frames per Second in pizza.html and resize

* Set the number of pizzas to 36 in document.addEventListener('DOMContentLoaded', function()
* Declare the "var phase" outside the loop to prevent it from being created each iteration.
* Refactored changePizzaSizes function and declutered "for loop"
* changed querySelectorAll for faster getElementsByClassName & getElementById
