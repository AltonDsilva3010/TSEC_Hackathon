// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyMarket is ERC721URIStorage {
    uint256 tokenId ;
    constructor() ERC721("PropertyItem", "PI") {
        tokenId = 0;
    }

    function mint(
        address _to,
        string calldata _uri
    ) external returns (uint256){
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _uri);
        return tokenId;
    }
}