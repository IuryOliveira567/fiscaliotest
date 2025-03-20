function formatarData(data: string | undefined): string {
  return data ? new Date(data).toISOString().split("T")[0] : '';
}

export default formatarData;