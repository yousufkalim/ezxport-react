export const getSortedData = (data,setData, setSort ,nestedTitles,field, ascend) => {
    console.log("data ", data);
    console.log("set data ", setData);
    console.log("setSort ", setSort);
    console.log("nested sort field ", nestedTitles);
    console.log("sorting field ", field);
    console.log("sorting order ", ascend);
    setSort({key:field, ascend})
    console.log("Sort runs ", nestedTitles)
    if(data){
      const nestedTitle = nestedTitles?.find((item) => item.fields.includes(field))?.title ?? ''
      const users = [...data];
      const sortedUsers = users.sort((a, b) => {
        let prevValue = '';
        let nextValue = '';
        let isString = true;
        if(nestedTitle){
          const prevCompany= a?.[nestedTitle];
          const nextCompany = b?.[nestedTitle];
          isString = typeof prevCompany?.[field] === 'string' ? true : false;
          prevValue = isString ? prevCompany?.[field]?.toLowerCase() : prevCompany?.[field];
          nextValue = isString ? nextCompany?.[field].toLowerCase() : nextCompany?.[field];
        }else {
          isString = typeof a?.[field] === 'string' ? true : false;
          prevValue = typeof a?.[field] === 'string' ? a?.[field]?.toLowerCase() : a?.[field];
          nextValue = typeof b?.[field] === 'string' ? b?.[field]?.toLowerCase() : b?.[field];
        }
        if(isString){
          if(prevValue > nextValue){
            return ascend ? 1 : -1;
          }
          else {
            return ascend ? -1 : 1;
          }
        }else {
          if(ascend){
            return prevValue - nextValue;
          }
          else {
            return nextValue - prevValue;
          }
        }
      });
      console.log("Sorrted daata ", sortedUsers);
      setData(sortedUsers)
    }
  }