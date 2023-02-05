
<?php

$inData = getRequestInfo();

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
  $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID = ? LIMIT ?,?");
  $stmt->bind_param("sii", $inData["UserID"], $inData["Counter"],$inData["Counter2"]);
  $stmt->execute();
  $result = $stmt->get_result();

  if( $row = $result->fetch_assoc()  )
  {
      returnWithInfo($row['Images'],$row['Name'],$row['Email'],$row['Phone'],$row['Relation'],$row['Alive'],$row['ID']);
  }
  else
  {
    returnWithError("No Records Found");
  }

  $stmt->close();
  $conn->close();
    /*$stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID = ? LIMIT ?,?");
    $stmt->bind_param("sii", $inData["UserID"], $inData["Counter"],$inData["Counter2"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc()  )
    {
      returnWithInfo($row['Name']);
    }
    else
    {
      returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();*/
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
function returnWithInfo( $images, $name, $email, $phone, $relation, $alive, $id)
{
  $retValue = '{"Image":"' . $images . '","Name":"' . $name . '","Email": "' . $email . '","Phone":"' . $phone . '","Relation":"' . $relation . '","Alive":"' . $alive . '","ID":"' . $id . '","error":""}';
  sendResultInfoAsJson( $retValue );
}

function returnWithError( $err )
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

?>
