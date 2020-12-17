import { DataFrame, FieldConfigSource, FieldMatcherID, FieldType, toDataFrame } from '@grafana/data';
import { GraphNGLegendEvent, GraphNGLegendEventMode } from '@grafana/ui';
import { hideSeriesConfigFactory } from './configFactory';

describe('hideSeriesConfigFactory', () => {
  it('should create config override matching one series', () => {
    const event: GraphNGLegendEvent = {
      mode: GraphNGLegendEventMode.toggleSelection,
      fieldIndex: {
        frameIndex: 0,
        fieldIndex: 1,
      },
    };

    const existingConfig: FieldConfigSource = {
      defaults: {},
      overrides: [],
    };

    const data: DataFrame[] = [
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'temperature', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
    ];

    const config = hideSeriesConfigFactory(event, existingConfig, data);

    expect(config).toEqual({
      defaults: {},
      overrides: [createOverride(['temperature'])],
    });
  });

  it('should create config override that append series to existing override', () => {
    const event: GraphNGLegendEvent = {
      mode: GraphNGLegendEventMode.appendToSelection,
      fieldIndex: {
        frameIndex: 1,
        fieldIndex: 1,
      },
    };

    const existingConfig: FieldConfigSource = {
      defaults: {},
      overrides: [createOverride(['temperature'])],
    };

    const data: DataFrame[] = [
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'temperature', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'humidity', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
    ];

    const config = hideSeriesConfigFactory(event, existingConfig, data);

    expect(config).toEqual({
      defaults: {},
      overrides: [createOverride(['temperature', 'humidity'])],
    });
  });

  it('should remove override if appending only the existing series override', () => {
    const event: GraphNGLegendEvent = {
      mode: GraphNGLegendEventMode.appendToSelection,
      fieldIndex: {
        frameIndex: 0,
        fieldIndex: 1,
      },
    };

    const existingConfig: FieldConfigSource = {
      defaults: {},
      overrides: [createOverride(['temperature'])],
    };

    const data: DataFrame[] = [
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'temperature', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'humidity', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
    ];

    const config = hideSeriesConfigFactory(event, existingConfig, data);

    expect(config).toEqual({
      defaults: {},
      overrides: [],
    });
  });

  it('should create config override that removes series if appending existing field', () => {
    const event: GraphNGLegendEvent = {
      mode: GraphNGLegendEventMode.appendToSelection,
      fieldIndex: {
        frameIndex: 0,
        fieldIndex: 1,
      },
    };

    const existingConfig: FieldConfigSource = {
      defaults: {},
      overrides: [createOverride(['temperature', 'humidity'])],
    };

    const data: DataFrame[] = [
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'temperature', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'humidity', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
    ];

    const config = hideSeriesConfigFactory(event, existingConfig, data);

    expect(config).toEqual({
      defaults: {},
      overrides: [createOverride(['humidity'])],
    });
  });

  it('should create config override replacing existing series', () => {
    const event: GraphNGLegendEvent = {
      mode: GraphNGLegendEventMode.toggleSelection,
      fieldIndex: {
        frameIndex: 1,
        fieldIndex: 1,
      },
    };

    const existingConfig: FieldConfigSource = {
      defaults: {},
      overrides: [createOverride(['temperature'])],
    };

    const data: DataFrame[] = [
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'temperature', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'humidity', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
    ];

    const config = hideSeriesConfigFactory(event, existingConfig, data);

    expect(config).toEqual({
      defaults: {},
      overrides: [createOverride(['humidity'])],
    });
  });

  it('should create config override removing existing series', () => {
    const event: GraphNGLegendEvent = {
      mode: GraphNGLegendEventMode.toggleSelection,
      fieldIndex: {
        frameIndex: 0,
        fieldIndex: 1,
      },
    };

    const existingConfig: FieldConfigSource = {
      defaults: {},
      overrides: [createOverride(['temperature'])],
    };

    const data: DataFrame[] = [
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'temperature', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'humidity', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
    ];

    const config = hideSeriesConfigFactory(event, existingConfig, data);

    expect(config).toEqual({
      defaults: {},
      overrides: [],
    });
  });

  it('should return existing override if invalid index is passed', () => {
    const event: GraphNGLegendEvent = {
      mode: GraphNGLegendEventMode.toggleSelection,
      fieldIndex: {
        frameIndex: 4,
        fieldIndex: 1,
      },
    };

    const existingConfig: FieldConfigSource = {
      defaults: {},
      overrides: [createOverride(['temperature'])],
    };

    const data: DataFrame[] = [
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'temperature', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
      toDataFrame({
        fields: [
          { name: 'time', type: FieldType.time, values: [1000, 2000, 3000, 4000] },
          { name: 'humidity', type: FieldType.number, values: [1, 3, 5, 7] },
        ],
      }),
    ];

    const config = hideSeriesConfigFactory(event, existingConfig, data);

    expect(config).toEqual({
      defaults: {},
      overrides: [createOverride(['temperature'])],
    });
  });
});

const createOverride = (matchers: string[]) => {
  return {
    __systemRef: 'hide_series_from',
    matcher: {
      id: FieldMatcherID.readOnly,
      options: {
        innerId: FieldMatcherID.byRegexp,
        innerOptions: `^(?!${matchers.join('$|')}$).*$`,
        formattedValue: `All except: ${matchers.join(', ')}`,
      },
    },
    properties: [
      {
        id: 'custom.hideFrom',
        value: {
          graph: true,
          legend: false,
          tooltip: false,
        },
      },
    ],
  };
};
