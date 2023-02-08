
<?php

$inData = getRequestInfo();

$searchResults = "";
$searchCount = 0;

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT Images,Name,Email,Phone,Relation,Alive,ID FROM Contacts WHERE UserID = ? AND Name LIKE ?");
    $TheName = "%" . $inData["Name"] . "%";
    $stmt->bind_param("ss", $inData["UserID"], $TheName);
    $stmt->execute();
    $result = $stmt->get_result();



    while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= "],";
			}
			$searchCount++;
			$searchResults .= '"'. $searchCount .'":["' . $row["Images"] . '","' . $row["Name"] . '","' . $row["Email"] . '","' . $row["Phone"] . '","' . $row["Relation"] . '","' . $row["Alive"] . '","' . $row["ID"] . '"';
		}

		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}

    $stmt->close();
    $conn->close();
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
function returnWithInfo( $searchResults )
{
  $retValue ='{' . $searchResults . '],"error":""}';
  sendResultInfoAsJson( $retValue );
}

function returnWithError( $err )
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

?>
