'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _DataTooltip = require('../DataTooltip/DataTooltip');

var _DataTooltip2 = _interopRequireDefault(_DataTooltip);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  /**
   * If your data set has a single series, or multiple series with all the same x values, use the data prop, and format like this: [[y1a, y1b, ... , x1], [y2a, y2b, ... , x2], ...]
   */
  data: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)),
  /**
   * If your data set has multiple series with different x values, use the datasets prop, and format like this: [[[y1a, x1a], [y2a, x2a], ...], [[y1b, x1b], [y2b, x2b], ...], ...]
   */
  datasets: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number))),
  /**
   * If your data set has multiple series, the seriesLabels array should contain strings labeling your series in the same order that your series appear in either data or datasets props.
   */
  seriesLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  id: _propTypes2.default.string,
  containerId: _propTypes2.default.string,
  margin: _propTypes2.default.object,
  labelOffsetX: _propTypes2.default.number,
  labelOffsetY: _propTypes2.default.number,
  axisOffset: _propTypes2.default.number,
  timeFormat: _propTypes2.default.string,
  xAxisLabel: _propTypes2.default.string,
  yAxisLabel: _propTypes2.default.string,
  onHover: _propTypes2.default.func,
  onMouseOut: _propTypes2.default.func,
  emptyText: _propTypes2.default.string,
  isUTC: _propTypes2.default.bool,
  color: _propTypes2.default.array,
  drawLine: _propTypes2.default.bool,
  animateAxes: _propTypes2.default.bool,
  showTooltip: _propTypes2.default.bool,
  showLegend: _propTypes2.default.bool,
  /**
   * Set this prop to false to prevent x values from being converted to time.
   */
  isXTime: _propTypes2.default.bool
};

var defaultProps = {
  data: [],
  datasets: [],
  seriesLabels: [],
  height: 300,
  width: 800,
  id: 'container',
  containerId: 'graph-container',
  margin: {
    top: 30,
    right: 20,
    bottom: 70,
    left: 65
  },
  labelOffsetX: 65,
  labelOffsetY: 55,
  axisOffset: 16,
  timeFormat: '%I:%M:%S',
  xAxisLabel: 'X Axis',
  yAxisLabel: 'Y Axis',
  onHover: function onHover() {},
  onMouseOut: function onMouseOut() {},
  emptyText: 'There is currently no data available for the parameters selected. Please try a different combination.',
  isUTC: false,
  color: ['#00a68f', '#3b1a40', '#473793', '#3c6df0', '#56D2BB'],
  drawLine: true,
  animateAxes: true,
  showTooltip: true,
  showLegend: false,
  isXTime: true
};

var LineGraph = function (_Component) {
  (0, _inherits3.default)(LineGraph, _Component);

  function LineGraph() {
    (0, _classCallCheck3.default)(this, LineGraph);
    return (0, _possibleConstructorReturn3.default)(this, (LineGraph.__proto__ || (0, _getPrototypeOf2.default)(LineGraph)).apply(this, arguments));
  }

  (0, _createClass3.default)(LineGraph, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          datasets = _props.datasets,
          width = _props.width,
          height = _props.height,
          margin = _props.margin,
          containerId = _props.containerId,
          emptyText = _props.emptyText,
          showLegend = _props.showLegend,
          seriesLabels = _props.seriesLabels;


      if (data.length > 0) {
        this.totalLines = data[0].length - 1;
      } else if (datasets.length > 0) {
        this.totalLines = datasets.length;
      }

      this.emptyContainer = d3.select('#' + containerId + ' .bx--line-graph-empty-text').text(emptyText).style('position', 'absolute').style('top', '50%').style('left', '50%').style('text-align', 'center').style('transform', 'translate(-50%, -50%)');

      this.svg = d3.select('#' + containerId + ' svg').attr('class', 'bx--graph').attr('width', width).attr('height', height).append('g').attr('class', 'bx--group-container').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      this.width = width - (margin.left + margin.right + (showLegend && seriesLabels.length > 0 ? 30 + _lodash2.default.max(seriesLabels.map(function (l) {
        return l.length;
      })) * 8 : 0));
      this.height = height - (margin.top + margin.bottom);

      this.initialRender();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.height != this.props.height || nextProps.width != this.props.width) {
        this.resize(nextProps.height, nextProps.width);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.data !== nextProps.data || this.props.datasets !== nextProps.datasets;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (this.x) {
        var data = nextProps.data.length > 0 ? nextProps.data : _lodash2.default.flatten(nextProps.datasets);
        this.x.domain(d3.extent(data, function (d) {
          return d[d.length - 1];
        }));
        this.y.domain([0, d3.max(data, function (d) {
          return d3.max(d.slice(0, d.length - 1));
        })]);

        this.updateEmptyState(nextProps.data.length > 0 ? nextProps.data : nextProps.datasets);
        this.updateData(nextProps);
      }
    }
  }, {
    key: 'updateEmptyState',
    value: function updateEmptyState(data) {
      if (data[0] ? !Array.isArray(data[0][0]) && data.length < 2 || Array.isArray(data[0][0]) && _lodash2.default.max(data.map(function (d) {
        return d.length;
      })) < 2 : true) {
        this.svg.style('opacity', '.3');
        this.emptyContainer.style('display', 'inline-block');
      } else {
        this.svg.style('opacity', '1');
        this.emptyContainer.style('display', 'none');
      }
    }
  }, {
    key: 'updateData',
    value: function updateData(nextProps) {
      var data = nextProps.data,
          datasets = nextProps.datasets,
          axisOffset = nextProps.axisOffset,
          xAxisLabel = nextProps.xAxisLabel,
          yAxisLabel = nextProps.yAxisLabel,
          animateAxes = nextProps.animateAxes;


      for (var i = 0; i < this.totalLines; i++) {
        this.svg.selectAll('g[data-line="' + i + '"]').remove();
      }

      if (data.length > 0) {
        this.totalLines = data[0].length - 1;
      } else if (datasets.length > 0) {
        this.totalLines = datasets.length;
      }

      if (animateAxes) {
        this.svg.select('.bx--axis--x').transition().call(this.xAxis).selectAll('.bx--axis--x .tick text').attr('y', axisOffset).style('text-anchor', 'end').attr('transform', 'rotate(-65)');

        this.svg.select('.bx--axis--y').transition().call(this.yAxis).selectAll('text').attr('x', -axisOffset);
      } else {
        this.svg.select('.bx--axis--x').call(this.xAxis).selectAll('.bx--axis--x .tick text').attr('y', axisOffset).style('text-anchor', 'end').attr('transform', 'rotate(-65)');

        this.svg.select('.bx--axis--y').call(this.yAxis).selectAll('text').attr('x', -axisOffset);
      }

      this.svg.select('.bx--axis--y .bx--graph-label').text(yAxisLabel);
      this.svg.select('.bx--axis--x .bx--graph-label').text(xAxisLabel);

      this.updateStyles();
    }
  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      this.svg.selectAll('.bx--axis--y path').style('display', 'none');
      this.svg.selectAll('.bx--axis path').attr('stroke', '#5A6872');
      this.svg.selectAll('.tick line').attr('stroke', '#5A6872');
      this.svg.selectAll('.tick text').attr('fill', '#5A6872');
    }
  }, {
    key: 'resize',
    value: function resize(height, width) {
      var _props2 = this.props,
          margin = _props2.margin,
          containerId = _props2.containerId,
          showLegend = _props2.showLegend,
          seriesLabels = _props2.seriesLabels;


      this.height = height - (margin.top + margin.bottom);
      this.width = width - (margin.left + margin.right + (showLegend && seriesLabels.length > 0 ? 30 + _lodash2.default.max(seriesLabels.map(function (l) {
        return l.length;
      })) * 8 : 0));

      this.svg.selectAll('*').remove();

      this.svg = d3.select('#' + containerId + ' svg').attr('class', 'bx--graph').attr('width', width).attr('height', height).append('g').attr('class', 'bx--group-container').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      this.initialRender();
    }
  }, {
    key: 'initialRender',
    value: function initialRender() {
      var _this2 = this;

      var _props3 = this.props,
          data = _props3.data,
          datasets = _props3.datasets,
          timeFormat = _props3.timeFormat,
          isUTC = _props3.isUTC,
          isXTime = _props3.isXTime,
          showLegend = _props3.showLegend,
          seriesLabels = _props3.seriesLabels;


      this.updateEmptyState(data.length > 0 ? data : datasets);

      var flatData = data.length > 0 ? data : _lodash2.default.flatten(datasets);

      if (isUTC) {
        this.x = d3.scaleUtc().range([0, this.width]).domain(d3.extent(flatData, function (d) {
          return d[d.length - 1];
        }));
      } else if (isXTime) {
        this.x = d3.scaleTime().range([0, this.width]).domain(d3.extent(flatData, function (d) {
          return d[d.length - 1];
        }));
      } else {
        this.x = d3.scaleLinear().range([0, this.width]).domain(d3.extent(flatData, function (d) {
          return d[d.length - 1];
        }));
      }

      this.y = d3.scaleLinear().range([this.height, 0]).domain([0, d3.max(flatData, function (d) {
        return d3.max(d.slice(0, d.length - 1));
      }) || 10]);

      this.line = d3.line().x(function (d) {
        return _this2.x(d[d.length - 1]);
      }).y(function (d) {
        return _this2.y(d[_this2.count]);
      }).defined(function (d) {
        return !isNaN(d[_this2.count]);
      });

      this.xAxis = d3.axisBottom().scale(this.x).tickSize(0).tickFormat(isXTime ? d3.timeFormat(timeFormat) : null);

      this.yAxis = d3.axisLeft().ticks(4).tickSize(-this.width).scale(this.y.nice());

      this.renderAxes();
      this.renderLabels();
      this.renderOverlay();

      if (this.x) {
        this.renderLine();
      }

      if (showLegend && seriesLabels.length > 0) {
        this.renderLegend();
      }
    }
  }, {
    key: 'renderAxes',
    value: function renderAxes() {
      var axisOffset = this.props.axisOffset;


      this.svg.append('g').attr('class', 'bx--axis bx--axis--y').attr('stroke-dasharray', '4').call(this.yAxis).selectAll('text').attr('x', -axisOffset);

      this.svg.append('g').attr('class', 'bx--axis bx--axis--x').attr('transform', 'translate(0, ' + this.height + ')').call(this.xAxis).selectAll('text').attr('y', axisOffset).style('text-anchor', 'end').attr('transform', 'rotate(-65)');

      this.updateStyles();
    }
  }, {
    key: 'renderLabels',
    value: function renderLabels() {
      var _props4 = this.props,
          labelOffsetY = _props4.labelOffsetY,
          labelOffsetX = _props4.labelOffsetX,
          xAxisLabel = _props4.xAxisLabel,
          yAxisLabel = _props4.yAxisLabel;


      this.svg.select('.bx--axis--y').append('text').text('' + yAxisLabel).attr('class', 'bx--graph-label').attr('transform', 'translate(' + -labelOffsetY + ', ' + this.height / 2 + ') rotate(-90)');

      this.svg.select('.bx--axis--x').append('text').text('' + xAxisLabel).attr('class', 'bx--graph-label').attr('transform', 'translate(' + this.width / 2 + ', ' + labelOffsetX + ')');

      this.svg.selectAll('.bx--graph-label').attr('font-size', '10').attr('font-weight', '700').attr('fill', '#5A6872').attr('text-anchor', 'middle');
    }
  }, {
    key: 'renderLine',
    value: function renderLine() {
      var _props5 = this.props,
          data = _props5.data,
          datasets = _props5.datasets,
          drawLine = _props5.drawLine;

      var color = d3.scaleOrdinal(this.props.color);
      var hasData = data.length > 0;
      var numLines = hasData ? data[0].length - 1 : datasets.length;

      this.count = 0;
      if (hasData || _lodash2.default.max(datasets.map(function (d) {
        return d.length;
      })) > 0) {
        for (var i = 0; i < numLines; i++) {
          var path = this.svg.append('g').attr('data-line', i).datum(hasData ? data : datasets[i]).append('path').attr('class', 'bx--line').attr('stroke', color(i)).attr('stroke-width', 2).attr('fill', 'none').attr('pointer-events', 'none').attr('d', this.line);

          var totalLength = path.node().getTotalLength();

          if (drawLine) {
            path.attr('stroke-dasharray', 0 + ' ' + totalLength).transition().ease(d3.easeSin).duration(1000).attr('stroke-dasharray', totalLength + ' ' + 0);
          } else {
            path.attr('stroke-dasharray', 0 + ' ' + totalLength).attr('stroke-dasharray', totalLength + ' ' + 0);
          }

          this.count += hasData ? 1 : 0;
        }
      }
    }
  }, {
    key: 'renderOverlay',
    value: function renderOverlay() {
      var _this3 = this;

      this.svg.append('rect').attr('width', this.width).attr('height', this.height).attr('class', 'overlay').style('fill', 'none').style('pointer-events', 'all').on('mousemove', function () {
        _this3.onMouseMove();
      }).on('mouseout', function () {
        _this3.onMouseOut();
      });
    }
  }, {
    key: 'renderLegend',
    value: function renderLegend() {
      var _this4 = this;

      var seriesLabels = this.props.seriesLabels;

      var legendRectSize = 18;
      var legendSpacing = 4;

      var legend = this.svg.selectAll('.legend').data(seriesLabels).enter().append('g').attr('class', 'legend').attr('transform', function (d, i) {
        var h = legendRectSize + legendSpacing;
        var offset = h * seriesLabels.length / 2;
        var horz = _this4.width + 10;
        var vert = i * h - offset + 50;
        return 'translate(' + horz + ',' + vert + ')';
      });

      legend.append('rect').attr('width', legendRectSize).attr('height', legendRectSize).style('fill', function (d, i) {
        return _this4.props.color[i];
      }).style('stroke', function (d, i) {
        return _this4.props.color[i];
      });

      legend.append('text').attr('x', legendRectSize + legendSpacing).attr('y', legendRectSize - legendSpacing).text(function (d, i) {
        return seriesLabels[i];
      });
    }
  }, {
    key: 'onMouseOut',
    value: function onMouseOut() {
      if (this.props.data.length > 2 || _lodash2.default.max(this.props.datasets.map(function (d) {
        return d.length;
      })) > 2) {
        this.props.onMouseOut();
        if (this.tooltipId) {
          _reactDom2.default.unmountComponentAtNode(this.tooltipId);
        }
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {
      var _this5 = this;

      if (!this.id) return null;

      var _props6 = this.props,
          margin = _props6.margin,
          data = _props6.data,
          datasets = _props6.datasets,
          showTooltip = _props6.showTooltip,
          timeFormat = _props6.timeFormat,
          color = _props6.color,
          height = _props6.height,
          labelOffsetX = _props6.labelOffsetX,
          isXTime = _props6.isXTime,
          seriesLabels = _props6.seriesLabels;


      if (data.length > 2 || _lodash2.default.max(datasets.map(function (d) {
        return d.length;
      })) > 2) {
        var bisectDate = d3.bisector(function (d) {
          return d[d.length - 1];
        }).right;
        var mouse = d3.mouse(this.id)[0] - margin.left;
        var timestamp = this.x.invert(mouse);
        var d = void 0,
            mouseData = void 0,
            tooltipHeading = void 0,
            tooltipData = void 0;
        if (data.length > 0) {
          var index = bisectDate(data, timestamp);
          var d0 = data[index - 1];
          var d1 = data[index];

          if (d0 && d1) {
            d = timestamp - d0[d0.length - 1] > d1[d1.length - 1] - timestamp ? d1 : d0;

            mouseData = {
              data: d,
              pageX: d3.event.pageX,
              pageY: d3.event.pageY,
              graphX: this.x(d[d.length - 1]),
              graphY: this.y(d[0]),
              graphYArray: d.slice(0, -1).map(this.y)
            };

            tooltipData = _lodash2.default.dropRight(d).map(function (p, i) {
              return {
                data: _lodash2.default.round(p, 2),
                label: seriesLabels[i],
                color: color[i]
              };
            });

            tooltipHeading = d.length > 2 ? isXTime ? d3.timeFormat(timeFormat)(d[d.length - 1]) : d[d.length - 1] : null;
          }
        } else {
          var mouseX = this.x(timestamp);
          var mouseY = d3.mouse(this.id)[1] - margin.top;
          var distances = [];
          d = _lodash2.default.sortBy(_lodash2.default.flatten(datasets), function (a) {
            var aDist = Math.pow(mouseX - _this5.x(a[a.length - 1]), 2) + Math.pow(mouseY - _this5.y(a[0]), 2);
            distances.push({ a: a, aDist: aDist });
            return aDist;
          })[0];
          var i = datasets.findIndex(function (set) {
            return set.includes(d);
          });

          mouseData = {
            data: d,
            pageX: d3.event.pageX,
            pageY: d3.event.pageY,
            graphX: this.x(d[d.length - 1]),
            graphY: this.y(d[0]),
            graphYArray: d.slice(0, -1).map(this.y)
          };

          var xVal = isXTime ? d3.timeFormat(timeFormat)(d[d.length - 1]) : d[d.length - 1];

          tooltipHeading = d.length > 2 ? xVal : null;

          tooltipData = _lodash2.default.dropRight(d).map(function (p) {
            return {
              data: _lodash2.default.round(p, 2),
              label: tooltipHeading ? seriesLabels[i] : xVal,
              color: color[i]
            };
          });
        }

        this.props.onHover(mouseData);

        if (showTooltip && tooltipData && tooltipData.length > 0) {
          _reactDom2.default.render(_react2.default.createElement(_DataTooltip2.default, { heading: tooltipHeading, data: tooltipData }), this.tooltipId);
          var tooltipSize = d3.select(this.tooltipId.children[0]).node().getBoundingClientRect();
          var offset = -tooltipSize.width / 2;
          d3.select(this.tooltipId).style('position', 'relative').style('left', mouseData.graphX + labelOffsetX + offset + 'px').style('top', this.y(_lodash2.default.max(_lodash2.default.dropRight(d))) - height - tooltipSize.height + 10 + 'px');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props7 = this.props,
          id = _props7.id,
          containerId = _props7.containerId;

      if (this.x) {
        this.renderLine();
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'bx--graph-container',
          id: containerId,
          style: { position: 'relative' } },
        _react2.default.createElement('p', { className: 'bx--line-graph-empty-text' }),
        _react2.default.createElement('svg', { id: id, ref: function ref(id) {
            return _this6.id = id;
          } }),
        _react2.default.createElement('div', { id: id + '-tooltip', ref: function ref(id) {
            return _this6.tooltipId = id;
          } })
      );
    }
  }]);
  return LineGraph;
}(_react.Component);

LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

exports.default = LineGraph;