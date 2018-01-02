/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This Test will loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('should have url defined', function() {
			allFeeds.forEach(function(eachFeed) {
				expect(eachFeed.url).toBeDefined();
                expect(eachFeed.url).not.toBe('');
            });
		});


        /* This test will loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('should have a name', function() {
			 allFeeds.forEach(function(eachFeed) {
				 expect(eachFeed.name).toBeDefined();
				 expect(eachFeed.name).not.toBe('');
			 })
		 })
    });


    /* Test suite to check the functionality of "The menu" */
	
	describe('The Menu', function () {
		
		/* This test will ensure the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		
		it('menu should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
		
		/* This test case will ensures that the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('menu visibility changes when clicked', function () {
			//does the menu display when clicked
		    $('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(false);
			//does it hide when clicked again.
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);	
		})  
		  
	});
	
	/* Test suite to check the functionality of the "Initial Entries" */
	describe('Initial Entries', function() {
		
	    /* This test will ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		 
		// call loadFeed initially since it's an asynchronous function
        beforeEach(function(cbFunction) {
            loadFeed(0, cbFunction); 
        });

		it('loadFeed function should return at least one entry element', function(cbFunction) {
			expect($(".feed .entry").length).toBeGreaterThan(0);
			cbFunction();
			
		})
	
	})

	/* This test suite will check the functionality for a "New Feed Selection" */
	describe('New Feed Selection', function() {
		
		/* This test will ensure that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		
		var firstFeed,
			secondFeed
			
		//Load first feed
        beforeEach(function(cbFunction) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
				loadFeed(1, function() {
					secondFeed = $('.feed').html();
					cbFunction();
				});	
            });
        });
		
		
		it('New feed should be loaded when clicked', function(cbFunction) {
			expect(secondFeed).not.toBe(firstFeed);
			cbFunction();
		});

	});
        
});
