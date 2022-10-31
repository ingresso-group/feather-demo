import React, { Component } from "react";

export default class ChartControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorSchemes: [
                {
                    label: "Feather",
                    colors: [
                        "#FEB390",
                        "#E56B92",
                        "#3D45C6",
                        "#5FCEB4",
                        "#4090C0",
                        "#C2C094",
                        "#390040",
                        "#444054",
                        "#BEBBBB",
                        "#7C9885",
                        "#FFE6E8",
                        "#8E3B46",
                        "#A18276",
                        "#FDE74C",
                        "#3891A6",
                        "#4C5B5C",
                    ],
                },
                {
                    label: "Sea Shells",
                    colors: [
                        "#f95e5e",
                        "#071a24",
                        "#265b76",
                        "#60b2c2",
                        "#dd9a8a",
                        "#005cbb",
                        "#c7e8f2",
                        "#e5c7f2",
                        "#f95e5e",
                        "#071a24",
                        "#265b76",
                        "#60b2c2",
                        "#dd9a8a",
                        "#005cbb",
                        "#c7e8f2",
                        "#e5c7f2",
                    ],
                },
                {
                    label: "High Contrast",
                    colors: [
                        "#f95e5e",
                        "#FFA726",
                        "#42A5F5",
                        "#fcabc7",
                        "#8febf7",
                        "#55cc5b",
                        "#ae87f2",
                        "#efdc32",
                        "#018930",
                        "#a37d70",
                        "#455A64",
                        "#7B1FA2",
                        "#fc9292",
                        "#aaaaaa",
                        "#fcc18a",
                        "#66FF99",
                    ],
                },
                {
                    label: "Pastel",
                    colors: [
                        "#462446",
                        "#B05F6D",
                        "#EB6B56",
                        "#FFC153",
                        "#47B39D",
                        "#CDCBA6",
                        "#008891",
                        "#00587A",
                        "#ff0000",
                        "#0F3057",
                    ],
                },
                {
                    label: "Bold",
                    colors: [
                        "#8ea1b3",
                        "#101415",
                        "#ff2600",
                        "#ed5165",
                        "#839496",
                        "#6ec14c",
                        "#d7a302",
                        "#0084cc",
                        "#b433e1",
                    ],
                },
                {
                    label: "Grayscale",
                    colors: [
                        "#444",
                        "#555",
                        "#666",
                        "#777",
                        "#888",
                        "#999",
                        "#aaa",
                        "#bbb",
                        "#ccc",
                        "#aaa",
                        "#444",
                        "#aaa",
                        "#444",
                        "#aaa",
                        "#444",
                        "#aaa",
                    ],
                },
            ],
        };
    }

    displayColorSchemes() {
        return this.state.colorSchemes.map((colorScheme, index) => {
            let props = {
                key: colorScheme.label,
                value: colorScheme.colors,
            };
            if (colorScheme.disabled) {
                props.disabled = "true";
            }
            return <option {...props}>{colorScheme.label}</option>;
        });
    }

    render() {
        return (
            <div className="chart-controls-container">
                <label>Change the color scheme</label>
                <select
                    onChange={(e) =>
                        this.props.selectColorScheme(e.target.value.split(","))
                    }
                >
                    {this.displayColorSchemes()}
                </select>
                <label>Change the background color</label>
                <input
                    value={this.props.chartBackgroundColor}
                    type="text"
                    onChange={(e) =>
                        this.props.onChangeChartBackgroundColor(e.target.value)
                    }
                />
                <button onClick={this.props.changeChartBackgroundColor}>
                    Change
                </button>
                <br />

                <div className="button-grid">
                    <button onClick={this.props.zoomIn}>Zoom In</button>
                    <button onClick={this.props.zoomOut}>Zoom Out</button>
                    <button onClick={this.props.resetChart}>Reset Chart</button>
                    <button onClick={this.props.showWidget}>Show Widget</button>
                    <button onClick={this.props.hideWidget}>Hide Widget</button>
                    <button onClick={this.props.showLegend}>Show Legend</button>
                    <button onClick={this.props.hideLegend}>Hide Legend</button>
                    <button onClick={this.props.showControls}>
                        Show Zoom Controls
                    </button>
                    <button onClick={this.props.hideControls}>
                        Hide Zoom Controls
                    </button>
                    <button onClick={this.props.halvePrices}>
                        Halve Prices
                    </button>
                    <button onClick={this.props.toggleCurrency}>
                        Toggle Currency Symbol
                    </button>
                </div>
            </div>
        );
    }
}
