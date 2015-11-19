(function(window) {

  // implementation selectElement
  var makeSelect = function(selectElement) {
    $('select').each(function (index) {
      var $this = $(this),
          selected = $this.find("option[selected]"),
          options = $this.find('option');

      $this.after('<div id="result-' + index + '" class="' + selectElement + '"></div>');
      $('#result-' + index).append('<dl id="active-' + index + '" class="ddl"></dl>');
      $('#active-' + index).append('<dt><span class="value" data-value="' + selected.val() + '">' + selected.text() + '</span></dt>');
      $('#active-' + index).append('<dd><ul></ul></dd>');
      options.each(function () {
        $('#active-' + index + ' dd ul').append('<li class="item"><span class="value" data-value="' + $(this).val() + '">' + $(this).text() + '</span></li>');
      });

      $('.ddl').each(function (index) {
        $(this).find('dd ul li').on('click', function (event) {
          event.preventDefault();
          var text = $(this).not('.value').html(),
              $base = $('.new-selectElement').eq(index);
          $('.ddl').eq(index).find('dt').html(text);
          $('.ddl').eq(index).find('dd ul').hide();
          $base.val($(this).find('span.value').html());

        });

      });


      $(".ddl").eq(index).find('dd ul').hide(); //start off close. comment out if you want it to open first. didn't have time to make it on option
      $(".ddl").eq(index).find('dt').on('click', function () {
      $(".ddl").eq(index).find('dd ul').toggle();
      });
      $(".ddl").eq(index).find('dd ul li').on('click', function () {
        var text = $(this).html(),
            newval = $(this).find('.value').html();
        $(".ddl").eq(index).find('dt span').html(text);
        $('select').eq(index).val(newval);
        $(".ddl").eq(index).find('dd ul').hide();
      });

      $(".ddl dt").on('click', function (event) {
        event.preventDefault();
      });
      //added
      var name = $("select").attr("name");
      $( "#my-form" ).submit(function( event ) {
        event.preventDefault();
        window.location.href = '?' + name + '=' + selected.val() + "/";
        console.log(name);
      });


      $(document).on('click', function (e) {
        var $event = $(e.target);
        if (!$event.parents().hasClass("ddl")) {
          $(".ddl").eq(index).find('dd ul').hide();
        }
        if (!$event.parents().hasClass("ddl-open")) {
          $event.parents().removeClass('ddl-open');
        }
      });

      $this.css('display', 'none');
      var initialval = $this.find('option').eq(0).html();
      $('#active-' + index + ' dt').html(initialval);



    });



    console.log('working!');
    //:::::::: Notes ::::::::
    // Use eq vs get
    // append was use to recreate the structure to support the open and close.
    // remove is used for

    //below I was my failed attempts ::::::::::::::

    //$(selectElement).bind("change", function (change) {
    //  var value = $(this).val();
    //  change = true;
    //  return alert(value);
    //  if (change) {
    //    $(this).find("option[value=" + value + "]").attr('selected', true);
    //  } else {
    //    $(this).attr('selected', false);
    //  }
    //});


      //if ($('select').length > 0) {
      //  selectElement('custom-select');
      //};


  }
  window.makeSelect = makeSelect;
}(window || this));


$(function() {
  if ($('select').length > 0) {
    makeSelect('#my-select');
  };
});
