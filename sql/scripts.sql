CREATE TABLE NotaFiscal(IdNota int not null unique, Emissor varchar(150),  DATA DATE, primary key(idNota));
CREATE INDEX Data ON notafiscal(DATA);
CREATE TABLE Item(IdNota int not null unique, IdItem int unique, Produto varchar(100), Valor decimal(15,3) ,primary key(IdNota, IdItem));
CREATE INDEX ProdutoIndice ON item(produto);

