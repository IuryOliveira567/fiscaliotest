function formatarData(data: string): string {
  return new Date(data).toISOString().split("T")[0];
}

export default formatarData;