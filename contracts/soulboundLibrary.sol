// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract soulboundLibrary is ERC721A{
    address _owner;
    mapping (uint => Book) books;

    struct Book{
        string isbn;
    }

    constructor(string memory name_, string memory symbol_) ERC721A(name_,symbol_) {
        _owner = msg.sender;
    }

    receive() external payable {
        revert("Fallback function, take your money back");
    }

    function getBook(uint id) public view returns(Book memory){
        require(_exists(id),"Book does not exist");
        return books[id];
    }
    //["a","b"]
    function mint(string memory author_,string memory name_, string memory isbn_) public payable {
        require(msg.value == 1000000000000000, "Book mint cost is 0.001 eth.");
        //require(isbn_.length == 10, "ISBN length not valid.");

        books[_nextTokenId()] = Book(isbn_);
        _safeMint(msg.sender,1);
    }

    function batchMint(string[] memory authors_, string[] memory names_, string[] memory isbns_, uint batchMintSize) public payable{
        require(batchMintSize > 1, "You can not batch mint a single book");
        require(batchMintSize <= 100, "Maximum batch mint count is 100");
        require(authors_.length == batchMintSize && names_.length == batchMintSize && isbns_.length == batchMintSize, "Inconsistent data");
        require(msg.value == (500000000000000 * batchMintSize), "Batch mint cost is 0.0005 eth * batchMintSize");

        uint tokenID = _nextTokenId();
        _safeMint(msg.sender,batchMintSize);

        for(uint i = 0; i < batchMintSize; i++){
            books[tokenID] = Book(isbns_[i]);
            tokenID++;
        }
    }

    function burn(uint tokenID_) public {
        require(ownerOf(tokenID_) == msg.sender || _owner == msg.sender,"Not authorized");
        _burn(tokenID_);
        delete books[tokenID_];
    }

    function withdraw(address _to, uint amount) public {
        require(msg.sender == _owner,"Not authorized");
        require(amount <= address(this).balance,"Not enough balance");
        payable(_to).transfer(amount);
    }
}