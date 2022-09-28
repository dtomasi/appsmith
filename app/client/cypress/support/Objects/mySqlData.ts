const mySqlData = {
  tableName: "mysqlDTs",
  inputFieldName: [
    "Stinyint_column",
    "Utinyint_column",
    "Ssmallint_column",
    "Usmallint_column",
    "Smediumint_column",
    "Umediumint_column",
    "Sint_column",
    "Uint_column",
    "Bigint_column",
    "Float_column",
    "Double_column",
    "Decimal_column",
    "Datetime_column",
    "Timestamp_column",
    "Date_column",
    "Time_column",
    "Year_column",
    "Varchar_column",
    "Char_column",
    "Enum_column",
    "Json_column",
  ],
  input: [
    [
      "-128",
      "0",
      "-32768",
      "0",
      "-8388608",
      "0",
      "-2147483648",
      "0",
      "123456",
      "123.45",
      "123.45",
      "123.45",
      "2012-12-31 11:30:45",
      "2012/12/31 11:30:45",
      "20121231",
      "838:59:59",
      "1901",
      "a",
      "a",
      "a",
      '{"abc": "123"}',
    ],
    [
      "0",
      "255",
      "0",
      "65535",
      "0",
      "16777215",
      "0",
      "4294967295",
      "456789",
      "123.456",
      "123.456",
      "123.456",
      "2012-12-31 11:30:45",
      "2012/12/31 11:30:45",
      "2012-12-31",
      "0:00:00",
      "2155",
      "abcdefghijklmnopqrst",
      "abcdefghij",
      "b",
      "{}",
    ],
    [
      "127",
      "0",
      "32767",
      "0",
      "8388607",
      "0",
      "2147483647",
      "0",
      "123456789",
      "123.451",
      "123.451",
      "123.451",
      "2012/12/31 11:30:45",
      "20121231113045",
      "2012/12/31",
      "-838:59:59",
      "1901'",
      "12345678912345",
      "012345",
      "c",
      "[1, 2, 3, 4]",
    ],
    [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "20121231113045",
      "121231113045",
      "121231",
      "11:12",
      "2155",
      "true",
      "false",
      "c",
      "[]",
    ],
    [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "20121231113045",
      "121231113045",
      "121231",
      "1112",
      "2022",
      "null",
      "NulL",
      "c",
      '["a",true,0,12.34]',
    ],
    [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "20121231113045",
      "121231113045",
      "121231",
      "12",
      "2022",
      "",
      "abc",
      "c",
      '{}',
    ],
  ],
  falseResult: [
    [-129, 128],
    [-1, 256],
    [-32769, 32768],
    [-1, 65536],
    [-8388609, 8388608],
    [-1, 16777216],
    [-2147483649, 2147483648],
    [-1, 4294967296],
    [],
    [123456789.45],
    ["a"],
    [123456789.45],
    ["2012/12/31 11:30:451"],
    ["2012/12/311 11:30:45"],
    ["2012-123-31"],
    ["22:591:59"],
    ["190123"],
    ["abcdefghijklmnopqrstu"],
    ["abcdefghijk"],
    ["d"],
    ["abc", "{", "["],
  ],
  result: [
    ["1", "2", "3", "4", "5"],
    ["-128", "0", "127"],
    ["0", "255"],
    ["-32768", "0", "32767"],
    ["0", "65535"],
    ["-8388608", "0", "8388607"],
    ["0", "16777215"],
    ["-2147483648", "0", "2147483647"],
    ["0", "4294967295"],
    ["123456", "456789", "123456789"],
    ["123.45", "123.46", "123.45"],
    ["123.45", "123.456", "123.451"],
    ["123.45", "123.46", "123.45"],
    [
      "2012-12-31T11:30:45Z",
      "2012-12-31T11:30:45Z",
      "2012-12-31T11:30:45Z",
      "2012-12-31T11:30:45Z",
      "2012-12-31T11:30:45Z",
    ],
    [
      "2012-12-31T11:30:45Z",
      "2012-12-31T11:30:45Z",
      "2012-12-31T11:30:45Z",
      "2012-12-31T11:30:45Z",
    ],
    ["2012-12-31", "2012-12-31", "2012-12-31", "2012-12-31"],
    ["22:59:59", "00:00:00", "01:00:01", "11:12:00", "00:11:12", "00:00:12"],
    ["1901", "2155", "1901", "2155"],
    ["a", "abcdefghijklmnopqrst", "12345678912345", "true", "null"],
    ["a", "abcdefghij", "012345", "false", "NulL"],
    ["a", "b", "c"],
    ["0", "1"],
    ['{"abc": "123"}', "{}", "[1, 2, 3, 4]", "[]", '["a", true, 0, 12.34]'],
  ],
  query: {
    createTable: `CREATE TABLE mysqlDTs (serialId SERIAL not null primary key, stinyint_column TINYINT, utinyint_column TINYINT UNSIGNED, 
      ssmallint_column SMALLINT, usmallint_column SMALLINT UNSIGNED, smediumint_column MEDIUMINT, umediumint_column MEDIUMINT UNSIGNED, 
      sint_column INT, uint_column INT UNSIGNED, bigint_column BIGINT, float_column FLOAT( 10, 2 ), double_column DOUBLE, decimal_column DECIMAL( 10, 2 ), 
      datetime_column DATETIME, timestamp_column TIMESTAMP, date_column DATE, time_column TIME, year_column YEAR, varchar_column VARCHAR( 20 ), 
      char_column CHAR( 10 ), enum_column ENUM( 'a', 'b', 'c' ), bool_column BOOL, json_column JSON);`,
    insertRecord: `INSERT INTO mysqlDTs (stinyint_column, utinyint_column, ssmallint_column, usmallint_column, smediumint_column, umediumint_column, 
      sint_column, uint_column, bigint_column, float_column, double_column, decimal_column, datetime_column, timestamp_column, 
      date_column, time_column, year_column, varchar_column, char_column, enum_column, bool_column, json_column ) 
      VALUES 
      ({{InsertStinyint.text}}, {{InsertUtinyint.text}}, {{InsertSsmallint.text}}, {{InsertUsmallint.text}}, {{InsertSmediumint.text}}, 
      {{InsertUmediumint.text}}, {{InsertSint.text}}, {{InsertUint.text}}, {{InsertBigint.text}}, {{InsertFloat.text}}, {{InsertDouble.text}}, 
      {{InsertDecimal.text}}, {{InsertDatetime.text}}, {{InsertTimestamp.text}}, {{InsertDate.text}}, {{InsertTime.text}}, 
      {{InsertYear.text}}, {{InsertVarchar.text ? InsertVarchar.text : null}}, {{InsertChar.text}}, {{InsertEnum.text}}, {{InsertBoolean.isSwitchedOn}}, {{InputJson.text}});`,
    deleteRecord: `DELETE FROM mysqlDTs WHERE serialId ={{Table1.selectedRow.serialid}}`,
    deleteAllRecords: `DELETE FROM mysqlDTs`,
    dropTable: `drop table mysqlDTs`,
  },
};

export default mySqlData;
