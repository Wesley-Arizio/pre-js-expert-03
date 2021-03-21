export default class FormatQuery {
  static execute(data) {
    const { where, select, orderBy, limit } = data;

    let formattedWhere;
    if (where && where.length !== 0) {
      formattedWhere = where.map((item) => {
        const [key, value] = item.split(":");

        return {
          [key]: value,
        };
      });
    } else {
      formattedWhere = [];
    }

    const limitToInteger = parseInt(limit);

    return {
      where: formattedWhere,
      select: select || [],
      orderBy: orderBy || "",
      limit: limitToInteger,
    };
  }
}
