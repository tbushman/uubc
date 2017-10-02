function main() {
  var map;

  //leaflet map
  map = L.map('map', {
    zoomControl: true,
    center: [20, -100],
    zoom: 3,
	minZoom: 2,
    maxZoom: 18
  });
  

  
  // add a base layer with labels layer
  // remember to add attribution.
  //L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map); //watercolor base map
  
  //as an alternative basemap, use (please call 510-725-2957 if basemap is missing. Ask for Tracey.): 
  L.tileLayer('http://{s}.tiles.mapbox.com/v3/tbushman.iba1gl27/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://mapbox.com">Mapbox</a>'
  }).addTo(map);  
  //define api url
  var layerUrl = 'http://bennioncenter.cartodb.com/api/v2/viz/ad37aa70-be70-11e3-bb31-0e73339ffa50/viz.json'; 
  



        
  // create layer and add to the map, then add some interactivity
  var lyr1 = [];//aka 'sublayers' in some other maps  
  cartodb.createLayer(map, layerUrl)
   .addTo(map)
   .on('done', function(layer) {
     var subLayerOptions = {
       sql: "SELECT * FROM full_uu",
       interactivity: 'cartodb_id'
     };
     //create sublayer
     var sublayer = layer.getSubLayer(0);
     sublayer.setInteraction(true);
     addCursorInteraction(sublayer);
     
     

     lyr1.push(sublayer);
     
     var sql = new cartodb.SQL({ user: 'bennioncenter' });
     //wire buttons (drop-down menu)
     $('.button').click(function(e, latlon, pxPos, data, layer) {
       
       $('.button').removeClass('selected');
       $(this).addClass('selected');
       $('#image').html("");
       $('.here').html("");
       $('.here-title').html("");
       LayerActions[$(this).attr('id')] ();
   });
});
  //This next part selects the sql statement passed to it (see 'LayerActions')
  function LayerSelect (sql_select) {
    var sql_init = new cartodb.SQL({ user: 'bennioncenter' });
    sql_init.getBounds(sql_select).done(function(bounds) {
       map.fitBounds(bounds);
    });
    lyr1[0].setSQL(sql_select);
    return true;
  };

  //this next chunk sets sql for each button id from the drop-down menu         
	 var LayerActions = { 
     all: function() { LayerSelect("SELECT * FROM full_uu") },
     bcp: function() { LayerSelect("SELECT * FROM full_uu WHERE groupone = 'Bennion Center Programs' OR grouptwo = 'Bennion Center Programs'") }, 
     altbreak: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Alternative Breaks' OR categorytwo = 'Alternative Breaks'") },
     americareads: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'America Reads' OR categorytwo = 'America Reads'") },
     ces: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Community Engaged Scholars' OR categorytwo = 'Community Engaged Scholars'") },
     specialprj: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Community Outreach' OR categorytwo = 'Community Outreach'") },
       bccorps: function() { LayerSelect("SELECT * FROM full_uu WHERE type = 'Bennion Center Service Corps' OR typetwo = 'Bennion Center Service Corps'") }, 
       fscorps: function() { LayerSelect("SELECT * FROM full_uu WHERE type = 'Freshman Service Corps' OR typetwo = 'Freshman Service Corps'") },
       satserv: function() { LayerSelect("SELECT * FROM full_uu WHERE type = 'Saturday Service Project' OR typetwo = 'Saturday Service Project'") },
     sdp: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Student Directed Programs' OR categorytwo = 'Student Directed Programs'") },
       education: function() { LayerSelect("SELECT * FROM full_uu WHERE type = 'Education and Advocacy'") },
       environment: function() { LayerSelect("SELECT * FROM full_uu WHERE type = 'Environmental Stewardship'") },
       health: function() { LayerSelect("SELECT * FROM full_uu WHERE type = 'Health and Ability'") },
       international: function() { LayerSelect("SELECT * FROM full_uu WHERE type = 'International Service'") },
       justice: function() { LayerSelect("SELECT * FROM full_uu WHERE type = 'Social Justice'") },
     celc: function() { LayerSelect("SELECT * FROM full_uu WHERE groupone = 'CEL Course' OR grouptwo = 'CEL Course'") },
     cer: function() { LayerSelect("SELECT * FROM full_uu WHERE groupone = 'Community Engaged Research' OR grouptwo = 'Community Engaged Research'") },
     outr: function() { LayerSelect("SELECT * FROM full_uu WHERE groupone = 'K-12 Outreach' OR grouptwo = 'K-12 Outreach'") },
       ooa: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Office of Admissions' OR categorytwo = 'Office of Admissions'") },
       ooe: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Office of Engagement' OR categorytwo = 'Office of Engagement'") },
       ooed: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Office of Equity and Diversity' OR categorytwo = 'Office of Equity and Diversity'") },
       src: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Sustainability Resource Center' OR categorytwo = 'Sustainability Resource Center'") },
       unhm: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Utah Natural History Museum' OR categorytwo = 'Utah Natural History Museum'") },
       unp: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'University Neighborhood Partners' OR categorytwo = 'University Neighborhood Partners'") },
       ubt: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Upward Bound Trio' OR categorytwo = 'Upward Bound Trio'") },
       uite: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Urban Institute for Teacher Education' OR categorytwo = 'Urban Institute for Teacher Education'") },
       wrc: function() { LayerSelect("SELECT * FROM full_uu WHERE category = 'Womens Resource Center' OR categorytwo = 'Womens Resource Center'") },
     colleges: function() { LayerSelect("SELECT * FROM full_uu WHERE groupone = 'CEL Course' OR grouptwo = 'CEL Course'") },
       archplan: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Architecture and Planning' OR collegetwo = 'College of Architecture and Planning'") },
         arch: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Architecture' OR departmenttwo = 'Architecture'") },
         plan: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'City and Metropolitan Planning' OR departmenttwo = 'City and Metropolitan Planning'") },
       business: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Business' OR collegetwo = 'College of Business' OR college = 'School of Business' OR collegetwo = 'School of Business'") },
         account: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Accounting' OR departmenttwo = 'Accounting'") },
         finance: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Finance' OR departmenttwo = 'Finance'") },
         manage: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Management' OR departmenttwo = 'Management'") },
         market: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Marketing' OR departmenttwo = 'Marketing'") },
         operationis: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Operations and Information Systems' OR departmenttwo = 'Operations and Information Systems'") },
       dentistry: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Dentistry' OR collegetwo = 'College of Dentistry' OR college = 'School of Dentistry' OR collegetwo = 'School of Dentistry'") },
         dented: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Dental Education' OR departmenttwo = 'Dental Education'") },
       education: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Education' OR collegetwo = 'College of Education'") },
         educultsoc: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Education, Culture and Society' OR departmenttwo = 'Education, Culture and Society'") },
         eduleadpol: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Educational Leadership and Policy' OR departmenttwo = 'Educational Leadership and Policy'") },
         edupsych: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Educational Psychology' OR departmenttwo = 'Educational Psychology'") },
         specialedu: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Special Education' OR departmenttwo = 'Special Education'") },
       engineer: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Engineering' OR collegetwo = 'College of Engineering'") },
         bioeng: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Bioengineering' OR departmenttwo = 'Bioengineering'") },
         chemeng: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Chemical Engineering' OR departmenttwo = 'Chemical Engineering'") },
         civenveng: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Civil and Environmental Engineering' OR departmenttwo = 'Civil and Environmental Engineering'") },
         computing: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Computing' OR departmenttwo = 'Computing'") },
         electcompeng: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Electrical and Computer Engineering' OR departmenttwo = 'Electrical and Computer Engineering'") },
         materialsci: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Materials Science and Engineering' OR departmenttwo = 'Materials Science and Engineering'") },
         mecheng: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Mechanical Engineering' OR departmenttwo = 'Mechanical Engineering'") },
       fineart: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Fine Arts' OR collegetwo = 'College of Fine Arts'") },
         arthist: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Art and Art History' OR departmenttwo = 'Art and Art History'") },
         ballet: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Ballet' OR departmenttwo = 'Ballet'") },
         moddance: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Modern Dance' OR departmenttwo = 'Modern Dance'") },
         film: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Film and Media Arts' OR departmenttwo = 'Film and Media Arts'") },
         music: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Music' OR departmenttwo = 'Music'") },
         theatre: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Theatre' OR departmenttwo = 'Theatre'") },
       health: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Health' OR collegetwo = 'College of Health'") },
         comscidis: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Communication Sciences and Disorders' OR departmenttwo = 'Communication Sciences and Disorders'") },
         exercise: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Exercise and Sport Science' OR departmenttwo = 'Exercise and Sport Science'") },
         healthedu: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Health Promotion and Education' OR departmenttwo = 'Health Promotion and Education'") },
         nutrition: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Nutrition' OR departmenttwo = 'Nutrition'") },
         occtherapy: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Occupational Therapy' OR departmenttwo = 'Occupational Therapy'") },
         parksrec: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Parks, Recreation, and Tourism' OR departmenttwo = 'Parks, Recreation, and Tourism'") },
       honors: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'Honors College' OR collegetwo = 'Honors College'") },
       humanities: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Humanities' OR collegetwo = 'College of Humanities'") },
         asia: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Asian Studies' OR departmenttwo = 'Asian Studies'") },
         comm: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Communication' OR departmenttwo = 'Communication'") },
         english: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'English' OR departmenttwo = 'English'") },
         ethnic: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Ethnic Studies' OR departmenttwo = 'Ethnic Studies'") },
         gender: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Gender Studies' OR departmenttwo = 'Gender Studies'") },
         history: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'History' OR departmenttwo = 'History'") },
         intlstud: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'International Studies' OR departmenttwo = 'International Studies'") },
         langlit: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Languages and Literature' OR departmenttwo = 'Languages and Literature'") },
         latinam: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Latin American Studies' OR departmenttwo = 'Latin American Studies'") },
         ling: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Linguistics' OR departmenttwo = 'Linguistics'") },
         philos: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Philosophy' OR departmenttwo = 'Philosophy'") },
         writing: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Writing and Rhetoric' OR departmenttwo = 'Writing and Rhetoric'") },
       law: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Law' OR collegetwo = 'College of Law'") },
       medicine: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Medicine' OR collegetwo = 'College of Medicine' OR college = 'School of Medicine' OR collegetwo = 'School of Medicine'") },
         anesth: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Anesthesiology' OR departmenttwo = 'Anesthesiology'") },
         biochem: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Biochemistry' OR departmenttwo = 'Biochemistry'") },
         biomedinfo: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Biomedical Informatics' OR departmenttwo = 'Biomedical Informatics'") },
         derm: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Dermatology' OR departmenttwo = 'Dermatology'") },
         prevmed: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Family and Preventive Medicine' OR departmenttwo = 'Family and Preventive Medicine'") },
         genetics: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Human Genetics' OR departmenttwo = 'Human Genetics'") },
         internal: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Internal Medicine' OR departmenttwo = 'Internal Medicine'") },
         medlab: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Medical Laboratory Science' OR departmenttwo = 'Medical Laboratory Science'") },
         neurobio: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Neurobiology and Anatomy' OR departmenttwo = 'Neurobiology and Anatomy'") },
         neurology: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Neurology' OR departmenttwo = 'Neurology'") },
         neurosurg: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Neurosurgery' OR departmenttwo = 'Neurosurgery'") },
         obstgyn: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Obstetrics and Gynecology' OR departmenttwo = 'Obstetrics and Gynecology'") },
         oncolog: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Oncological Sciences' OR departmenttwo = 'Oncological Sciences'") },
         opthal: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Opthalmology' OR departmenttwo = 'Opthalmology'") },
         orthopaed: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Orthopaedics' OR departmenttwo = 'Orthopaedics'") },
         pathology: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Pathology' OR departmenttwo = 'Pathology'") },
         pediatrics: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Pediatrics' OR departmenttwo = 'Pediatrics'") },
         physmedrehab: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Physical Medicine and Rehabilitation' OR departmenttwo = 'Physical Medicine and Rehabilitation'") },
         physther: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Physical Therapy' OR departmenttwo = 'Physical Therapy'") },
         physiology: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Physiology' OR departmenttwo = 'Physiology'") },
         psychiatry: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Psychiatry' OR departmenttwo = 'Psychiatry'") },
         radioncol: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Radiation Oncology' OR departmenttwo = 'Radiation Oncology'") },
         radiology: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Radiology' OR departmenttwo = 'Radiology'") },
         surgery: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Surgery' OR departmenttwo = 'Surgery'") },
       mines: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Mines and Earth Sciences' OR collegetwo = 'College of Mines and Earth Sciences'") },
         atmos: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Atmospheric Sciences' OR departmenttwo = 'Atmospheric Sciences'") },
         geology: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Geology and Geophysics' OR departmenttwo = 'Geology and Geophysics'") },
         metaleng: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Metallurgical Engineering' OR departmenttwo = 'Metallurgical Engineering'") },
         miningeng: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Mining Engineering' OR departmenttwo = 'Mining Engineering'") },
       nursing: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Nursing' OR collegetwo = 'College of Nursing'") },
       pharmacy: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Pharmacy' OR collegetwo = 'College of Pharmacy'") },
         medchem: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Medicinal Chemistry' OR departmenttwo = 'Medicinal Chemistry'") },
         pharmchem: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Pharmaceutics and Pharmaceutical Chemistry' OR departmenttwo = 'Pharmaceutics and Pharmaceutical Chemistry'") },
         pharmtox: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Pharmacology and Toxicology' OR departmenttwo = 'Pharmacology and Toxicology'") },
         pharmther: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Pharmacotherapy' OR departmenttwo = 'Pharmacotherapy'") },
         pharmserv: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Pharmacy Services' OR departmenttwo = 'Pharmacy Services'") },
       science: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Science' OR collegetwo = 'College of Science'") },
         biology: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Biology' OR departmenttwo = 'Biology'") },
         chemistry: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Chemistry' OR departmenttwo = 'Chemistry'") },
         math: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Mathematics' OR departmenttwo = 'Mathematics'") },
         physastro: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Physics and Astronomy' OR departmenttwo = 'Physics and Astronomy'") },
       socialsci: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Social and Behavioral Science' OR collegetwo = 'College of Social and Behavioral Science'") },
         anthro: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Anthropology' OR departmenttwo = 'Anthropology'") },
         econ: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Economics' OR departmenttwo = 'Economics'") },
         family: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Family and Consumer Studies' OR departmenttwo = 'Family and Consumer Studies'") },
         geography: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Geography' OR departmenttwo = 'Geography'") },
         polisci: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Political Science' OR departmenttwo = 'Political Science'") },
         psychology: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Psychology' OR departmenttwo = 'Psychology'") },
         sociology: function() { LayerSelect("SELECT * FROM full_uu WHERE department = 'Sociology' OR departmenttwo = 'Sociology'") },
       socialwork: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'College of Social Work' OR collegetwo = 'College of Social Work'") },
       understud: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'Office of Undergraduate Studies' OR collegetwo = 'Office of Undergraduate Studies'") },
       aero: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'Aerospace Studies' OR collegetwo = 'Aerospace Studies'") },
       continued: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'Continuing Education' OR collegetwo = 'Continuing Education'") },
       military: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'Military Science' OR collegetwo = 'Military Science'") },
       navalsci: function() { LayerSelect("SELECT * FROM full_uu WHERE college = 'Naval Science' OR collegetwo = 'Naval Science'") },
	 };
  
  
  //search function  
  var sql = cartodb.SQL({ user: 'bennioncenter' });
  $( "#input" ).autocomplete({
    source: function( request, response ) {
      sql.execute("select cartodb_id, label, city, state, title, type, college, (label ilike'%"+request.term +"%') AS full_match from full_uu where label ilike '%" + request.term + "%' OR city ilike '%"+request.term +"%' OR state ilike '%"+request.term +"%' OR title ilike '%"+request.term +"%' OR type ilike '%"+request.term +"%' OR college ilike '%"+request.term +"%' ORDER BY title ").done(function(ret) { //get 'ret' (data) for a hyperlinked list of features matching the search input

        $('#image').html("");
        var list = ret.rows;
        $('.here-title').html(list.length+" search results:");
        $('.here').html("<ul></ul>");
        var i = 0;
        for (i in list){
          var newelement = $('<li></li>');
          newelement
          .attr('id', list[i].cartodb_id)
          .html('<a href="#'+ret.rows[i].cartodb_id+'" class="cartodb_id" id="'+list[i].cartodb_id +'"> <h3>'+list[i].label+ '</h3><h5>'+list[i].title+'</h5></a>');
          $('.here').append(newelement);
        }
        //Click on one of the list items
        $('.cartodb_id').on('click', function () {
          
           //and then get the clicked feature's attributes for the sidepanel
          $.get("http://bennioncenter.cartodb.com/api/v2/sql?q=select title, titletwo, college, collegetwo, type, description, link, image, ST_X(the_geom) lon, ST_Y(the_geom) lat, label  from full_uu WHERE cartodb_id = " + $(this).attr('id'), function (ret) {
            
            var list = ret.rows[0];
            var lat = ret.rows[0].lat;
            delete ret.rows[0].lat;
            var lon = ret.rows[0].lon;
            delete ret.rows[0].lon;
            map.setView(new L.LatLng(lat, lon), 16);
            $('.here-title').html("");
            $('.here').html("");
            var label = list.label;
            $('#image').append('<h2>' + label + '</h2>');
			     var image = list.image;
           if (image.split('/').indexOf('blank_image.png') !== -1) {
             image = 'images/blank_image.png';
           }
			     $('#image').append('<div class="gradient"></div><img src="'+image+'" class="image-here">');
            var title = list.title;
            var titletwo = list.titletwo;
            $('.here').append('<h3>'+ title + '&nbsp&nbsp&nbsp'+titletwo+'</h3>');
            var type = list.type;
            $('.here').append('<h3>' + type + '</h3>');
            var college = list.college;
            $('.here').append('<h3>' + college + '</h3>');
            var collegetwo = list.collegetwo;
            $('.here').append('<h3>' + collegetwo + '</h3>');
            var description = list.description;
            $('.here').append('<p>' + description + '</p>');
            var link = list.link;
            $('.here').append('<a href="' + link + '" target="_blank">'+'Click here for more info.'+'</a>');
          });
        });
      });
    },
    minLength: 2
  });
  
  
  
  function addCursorInteraction(sublayer) {
        
       var hovers = [];
       //1 is the points: 'pointer' when mouse over
        sublayer.bind('featureOver', function(e, latlon, pxPos, data, layer) {
          hovers[layer] = 1;
          if(_.any(hovers)) {
            $('#map').css('cursor', 'pointer');
          }
        });

      //0 is the base layer. Cursor 'auto' if mouse over
        sublayer.bind('featureOut', function(m, layer) {
          hovers[layer] = 0;
          if(!_.any(hovers)) {
            $('#map').css('cursor', 'move');
            if($(window).width() <= 520){
            $('.footer').animate({right:'-75em'}, 500)};
          }
        });
      
        //when feature clicked, move to location, then append items to sidepanel:
       sublayer.bind('featureClick', function (e, latlon, pxPos, data, layer) {
           
         if($(window).width() <= 520){
           $('.footer').animate({right:'.5em'}, 500)}; 
         $.get("http://bennioncenter.cartodb.com/api/v2/sql?q=select label, title, titletwo, college, collegetwo, description, link, image, ST_X(the_geom) lon, ST_Y(the_geom) lat  from full_uu WHERE cartodb_id = " + data.cartodb_id, function (ret) {
           var list = ret.rows[0];
           var lat = ret.rows[0].lat;
           delete ret.rows[0].lat;
           var lon = ret.rows[0].lon;
           delete ret.rows[0].lon;
           var zoom = map.getZoom(zoom);
           console.log(zoom);
           map.setView(new L.LatLng(lat, lon)); 
            
              
           //This is the query for generating the list of nearby features
           //Determine if there are coincident features on click, then either append a list of features or a single features' attributes to the sidepanel
           var sql = cartodb.SQL({ user: 'bennioncenter' });
           sql.execute("select cartodb_id, label, title, college, type from full_uu where st_distance( the_geom, st_GeomFromText('POINT("+lon+" "+lat+")', 4326), true ) < (SELECT CDB_XYZ_Resolution("+zoom+")*(("+zoom+")*1.15)) ORDER BY label", function (ret) { //this query uses screen distance from a clicked (top) feature: the multiplier, 1.15, means that all points that fall within 1.15 times the marker width are counted as coincident. 
             
             var list = ret.rows;
             if (list.length > 1) {
                $('#image').html("");
                $('.here-title').html(list.length + " programs at this location:");
                $('.here').html("<ul></ul>");
                var i = 0;
                for (i in list){
                var newelement = $('<li></li>');
                newelement
                .attr('id', ret.rows[i].cartodb_id)
                .html('<a href="#'+ret.rows[i].cartodb_id+'" class="cartodb_id" id="'+list[i].cartodb_id +'"> <h3>'+list[i].label+ '</h3><h5>'+list[i].title+'</h5></a>');

                $('.here').append(newelement);
                  map.setView(new L.LatLng(lat, lon), (zoom+2));
                }
                //Click on one of the list items
                $('.cartodb_id').on('click', function () {
                  
                   //and then get the clicked feature's attributes for the sidepanel
                  $.get("http://bennioncenter.cartodb.com/api/v2/sql?q=select title, titletwo, college, collegetwo, type, description, link, image, ST_X(the_geom) lon, ST_Y(the_geom) lat, label  from full_uu WHERE cartodb_id = " + $(this).attr('id'), function (ret) {
                    
                    var list = ret.rows[0];
                    var lat = ret.rows[0].lat;
                    delete ret.rows[0].lat;
                    var lon = ret.rows[0].lon;
                    delete ret.rows[0].lon;
                    map.setView(new L.LatLng(lat, lon), 16);
                    $('.here-title').html("");
                    $('.here').html("");
                    var label = list.label;
                    $('#image').append('<h2>' + label + '</h2>');
					        var image = list.image;
                  if (image.split('/').indexOf('blank_image.png') !== -1) {
                    image = 'images/blank_image.png';
                  }
					        $('#image').append('<div class="gradient"></div><img src="'+image+'" class="image-here">');
                    var title = list.title;
                    var titletwo = list.titletwo;
                    $('.here').append('<h3>'+ title + '&nbsp&nbsp&nbsp'+titletwo+'</h3>');
		               var type = list.type;
		               $('.here').append('<h3>' + type + '</h3>');
                    var college = list.college;
                    $('.here').append('<h3>' + college + '</h3>');
                    var collegetwo = list.collegetwo;
                    $('.here').append('<h3>' + collegetwo + '</h3>');
                    var description = list.description;
                    $('.here').append('<p>' + description + '</p>');
                    var link = list.link;
                    $('.here').append('<a href="' + link + '" target="_blank">'+'Click here for more info.'+'</a>');
                  });
                });
              }
              else 
              {
                //If no coincident features within resolution: append only single feature info (no list)
                $('#image').html("");
                $.get("http://bennioncenter.cartodb.com/api/v2/sql?q=select label, title, titletwo, college, collegetwo, type, description, link, image, ST_X(the_geom) lon, ST_Y(the_geom) lat  from full_uu WHERE cartodb_id = " + data.cartodb_id, function (ret) {
                  var list = ret.rows[0];
                  var lat = ret.rows[0].lat;
                  delete ret.rows[0].lat;
                  var lon = ret.rows[0].lon;
                  delete ret.rows[0].lon;
                  var zoom = map.getZoom(zoom);
                  console.log(zoom);
                  map.setView(new L.LatLng(lat, lon));
                  
                  $('.here-title').html("");
                  $('.here').html("");
                  $('#image').html("");
              
                  
                    var label = list.label;
                    console.log(label);
                    $('#image').append('<h2>' + label + '</h2>');
					        var image = list.image;
                  if (image.split('/').indexOf('blank_image.png') !== -1) {
                    image = 'images/blank_image.png';
                  }
					        $('#image').append('<div class="gradient"></div><img src="'+image+'" class="image-here">');
                    var title = list.title;
                    var titletwo = list.titletwo;
                    $('.here').append('<h3>'+ title + '&nbsp&nbsp&nbsp'+titletwo+'</h3>');
		               var type = list.type;
		               $('.here').append('<h3>' + type + '</h3>');
                    var college = list.college;
                    $('.here').append('<h3>' + college + '</h3>');
                    var collegetwo = list.collegetwo;
                    $('.here').append('<h3>' + collegetwo + '</h3>');
                    var description = list.description;
                    $('.here').append('<p>' + description + '</p>');
                    var link = list.link;
                    $('.here').append('<a href="' + link + '" target="_blank">'+'Click here for more info.'+'</a>');
                });
              }
            });
          });
        });
     }


	 }




window.onload = main;



$(document).ready(function() {
	setMenus();
    $('#search').click(function(){
    $('.footer').animate({right:'.5em'}, 500)});
	
});



/* ================================================================
	MENU FUNCTIONS
===================================================================*/
// close menu before leaving, prevent expanding menu when return to page
$(window).unload(function() {
  $('#top-nav a').blur();
  $('#top-nav2 a').blur();
  $('#top-nav3 a').blur();
});
	
	
//check initial width of the screen and respond with appropriate menu
function setMenus() {
    
    leftMenu();
    midMenu();
    rightMenu();
	
}


function leftMenu(){
	// reset menu items
	$('menu-toggle a').off('click');
	$('#top-nav').find('*').removeClass('expand open focus');
	$('.menu-toggle').remove();
	
	//create the menu toggle items
  $('#top-nav .menu').before('<div class="menu-toggle"><a href="#"><h2>Bennion Center Programs </h2></a></div>');
	
 	
	//  --- end reset
	
	//Top - change top nav menu states
	$('#top-nav .menu-toggle a').click(function() {
		//expand the menu
		$(this).toggleClass('open');
     $('#top-nav ul.submenu').removeClass('expand');		
		$('#top-nav .menu').toggleClass('expand');
		$('#top-nav2 .menu').removeClass('expand');
     $('#top-nav2 ul.submenu').removeClass('expand');		
     $('#top-nav2 ul.subsub').removeClass('expand');		
		$('#top-nav3 .menu').removeClass('expand');
     $('#top-nav3 ul.submenu').removeClass('expand');		
     $('#top-nav3 ul.subsub').removeClass('expand');		
      //figure out whether the indicator should be changed to + or -
		return false;
	});
	
	//Top - submenu items
  $('#top-nav .menu h3').click(function(){
    //find the current submenu
    var currentItem = $(this).siblings('.submenu');
    //close other submenus by removing the expand class
    if(currentItem.length > 0){
      $('#top-nav ul.submenu').not(currentItem).removeClass('expand');
      //open the selected submenu
      $(this).toggleClass('open').siblings('.submenu').toggleClass('expand');
    }
    else {
      $('#top-nav .menu').removeClass('expand');
      $('#top-nav .submenu').removeClass('expand');
    }
    return false;
  });
  $('#top-nav ul.submenu').click(function(){
    $('#top-nav .menu').removeClass('expand');
  });
}

//handle menu for small screen
function midMenu(){
	// reset menu items
	$('menu-toggle2 a').off('click');
	$('#top-nav2').find('*').removeClass('expand open focus');
	$('.menu-toggle2').remove();
	
	//create the menu toggle items
  $('#top-nav2 .menu').before('<div class="menu-toggle2"><a href="#"><h2>Academic Engagement </h2></a></div>');
	
	//  --- end reset
	
	//Top - change top nav menu states
	$('#top-nav2 .menu-toggle2 a').click(function() {
		//expand the menu
		$(this).toggleClass('open');
		$('#top-nav2 .menu').toggleClass('expand');
		$('#top-nav2 ul.submenu').removeClass('expand');
		$('#top-nav .menu').removeClass('expand');
     $('#top-nav ul.submenu').removeClass('expand');		
		$('#top-nav3 .menu').removeClass('expand');
     $('#top-nav3 ul.submenu').removeClass('expand');		
		return false;
	});
	
	//Top - submenu items
	$('#top-nav2 .menu h3').click(function(){
    $('#top-nav2 ul.subsub').removeClass('expand');

		//find the current submenu
		var currentItem = $(this).siblings('.submenu');
		//close other submenus by removing the expand class
    if(currentItem.length > 0){
		$('#top-nav2 ul.submenu').not(currentItem).removeClass('expand');
		//change the indicator of any closed submenus
		$(this).toggleClass('open').siblings('.submenu').toggleClass('expand');
    }
    else {
      $('#top-nav2 .menu').removeClass('expand');
    }
      return false;		
	});
  
	
	//Top - subsubmenu items
	$('#top-nav2 .submenu li a').click(function(){
		
		//find the current submenu
		var currentItem = $(this).siblings('.subsub');
		//close other submenus by removing the expand class
    if(currentItem.length > 0){
		$('#top-nav2 ul.subsub').not(currentItem).removeClass('expand');
		//change the indicator of any closed submenus
		$(this).toggleClass('open').siblings('.subsub').toggleClass('expand');
    }
    else {
      $('#top-nav2 .menu').removeClass('expand');
    }
      return false;		
	});
  $('#top-nav2 ul.subsub').click(function(){
    $('#top-nav2 .menu').removeClass('expand');
  });
	
}

	

//handle menu for small screen
function rightMenu(){
	// reset menu items
	$('menu-toggle3 a').off('click');
	$('#top-nav3').find('*').removeClass('expand open focus');
	$('.menu-toggle3').remove();
	
	//create the menu toggle items
  $('#top-nav3 .menu').before('<div class="menu-toggle3"><a href="#" id="partprog" class="button partprog"><h2>Partnership Programs</h2></a></div>');
	
	//  --- end reset
	
	//Top - change top nav menu states
	$('#top-nav3 .menu-toggle3 a').click(function() {
		//expand the menu
		$(this).toggleClass('open');
		$('#top-nav .menu').removeClass('expand');
        $('#top-nav ul.submenu').removeClass('expand');		
		$('#top-nav2 .menu').removeClass('expand');
        $('#top-nav2 ul.submenu').removeClass('expand');		
		$('#top-nav3 .menu').toggleClass('expand');
		return false;
	});
	
	//Top - submenu items
	$('#top-nav3 .menu h3').click(function(){
		
		//find the current submenu
		var currentItem = $(this).siblings('.submenu');
		//close other submenus by removing the expand class
    if(currentItem.length > 0){
		$('#top-nav3 ul.submenu').not(currentItem).removeClass('expand');
		//change the indicator of any closed submenus
		//open the selected submenu
		$(this).toggleClass('open').siblings('.submenu').toggleClass('expand');
      return false;		
    }
    else {
      $('#top-nav3 .menu').removeClass('expand');
    }
	});
  $('#top-nav3 ul.submenu').click(function(){
    $('#top-nav3 .menu').removeClass('expand');
  });

  $('#map').click(function(){
      $('#top-nav .menu').removeClass('expand');
      $('#top-nav2 .menu').removeClass('expand');
      $('#top-nav3 .menu').removeClass('expand');
		  $('#top-nav ul.submenu').removeClass('expand');
		  $('#top-nav2 ul.submenu').removeClass('expand');
		  $('#top-nav3 ul.submenu').removeClass('expand');
		  $('#top-nav ul.subsub').removeClass('expand');
		  $('#top-nav2 ul.subsub').removeClass('expand');
		  $('#top-nav3 ul.subsub').removeClass('expand');
  });
}

	



	
/* --------------End Menu Functions --------------*/



/*----- Some Javascript to fix the iOS orientation zoom bug -------*/
if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
	/* Since iOS 6 and up don't have this bug, apply fix to iOS versions 5 or less */
	if (/OS [1-5](.*) like Mac OS X/i.test(navigator.userAgent)) {
	  var viewportmeta = document.querySelector('meta[name="viewport"]');
		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
			document.body.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=10.0';
			}, false);
		}
	}
}

