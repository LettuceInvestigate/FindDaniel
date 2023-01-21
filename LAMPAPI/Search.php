
<?php

$inData = getRequestInfo();

$column = $inData
// $ID = $inData["ID"];
// $userId = $inData["userId"];
// $Name = $inData["Name"];
// $Phone = $inData["Phone"];
// $Email = $inData["Email"];
// $Alive = $inData["Alive"];
// $Relationship = $inData["Relationship"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    // Get tables from MySQL - Each line brings back only its respective columns
    $result = $mysqli->query("SELECT ".$column." FROM Contacts");
//  $result = $mysqli->query("SELECT ID, userId, Name, Phone, Email, Alive, Relationship FROM Contacts");

    // Perform the search
    for ($rowNum = $result->num_rows - 1; $rowNum >= 0; $rowNum--) {
        $result -> data_seek($rowNum);
        $row = $result->fetch_row();
        // $row[$column] is the specific field value, maybe create a data structure to append $row array results to?
    }
    // Do etc idk

    $conn->close();
    returnWithError("");
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError( $err )
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

?>
