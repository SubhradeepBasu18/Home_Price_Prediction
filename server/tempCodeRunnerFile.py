json','r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]