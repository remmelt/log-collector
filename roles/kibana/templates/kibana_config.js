define(['settings'],
function (Settings) {

  return new Settings({
    elasticsearch: "http://{{ queue_host }}/",

    default_route: '/dashboard/file/default.json',
    kibana_index: "kibana-int",
    panel_names: [
      'histogram',
      'map',
      'pie',
      'table',
      'filtering',
      'timepicker',
      'text',
      'hits',
      'column',
      'trends',
      'bettermap',
      'query',
      'terms',
      'stats',
      'sparklines'
    ]
  });
});
